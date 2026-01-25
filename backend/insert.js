const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'chatbot';
const COLLECTION_NAME = 'qa';

const categories = {
  1257: "개인정보", 
  1814: "무인비행장치",
  1702: "분야별개인정보",
  1575: "인터넷개인방송",
  293: "인터넷명예훼손",
  901: "불법이용규제",
  724: "특허권",
  1650: "휴대전화이용자"
};

async function extractAstSeq(csmSeq) {
  const url = `https://www.easylaw.go.kr/CSP/OnhunqueansLstPopRetrieve.laf?csmSeq=${csmSeq}`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const firstOnclick = $('li.qa .q .ttl p').first().attr('onclick');
  const match = firstOnclick?.match(/'[^']*','[^']*','(\d+)','(\d+)'/);
  if (match) {
    return { astSeq: match[1], html };
  } else {
    throw new Error(`AST_SEQ 추출 실패 (csmSeq: ${csmSeq})`);
  }
}

async function extractQuestions(html) {
  const $ = cheerio.load(html);
  const questions = [];

  $('li.qa').each((i, el) => {
    const p = $(el).find('.q .ttl p');
    const onclick = p.attr('onclick');
    const questionText = p.text().trim();

    const match = onclick?.match(/'[^']*','[^']*','(\d+)','(\d+)'/);
    if (match) {
      const astSeq = match[1];
      const onhunqueSeq = match[2];
      questions.push({ question: questionText, astSeq, seq: onhunqueSeq });
    }
  });

  return questions;
}

async function fetchAnswer(astSeq, seq) {
  const res = await axios.post('https://www.easylaw.go.kr/CSP/OnhunqnaRetrieveLstPopAjax.laf', null, {
    params: {
      onhunqnaAstSeq: astSeq,
      onhunqueSeq: seq
    }
  });

  const $ = cheerio.load(res.data);
  return $('body').text().trim().replace(/\s+/g, ' ');
}

async function crawlAndInsert() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  try {
    for (const [csmSeq, category] of Object.entries(categories)) {
      console.log(`\n📂 카테고리: ${category} (csmSeq: ${csmSeq})`);

      let astSeq, html;
      try {
        ({ astSeq, html } = await extractAstSeq(csmSeq));
        console.log(`🔑 AST_SEQ 추출 성공: ${astSeq}`);
      } catch (err) {
        console.error(`❌ AST_SEQ 추출 실패 (${category}):`, err.message);
        continue;
      }

      const questions = await extractQuestions(html);
      console.log(`💬 질문 수: ${questions.length}`);

      const items = [];

      for (const { question, seq } of questions) {
        try {
          const answer = await fetchAnswer(astSeq, seq);
          if (answer.length > 10) {
            items.push({ category, question, answer });
          } else {
            console.warn(`⚠️ 답변 없음 → ${question}`);
          }
        } catch (e) {
          console.warn(`❌ 답변 요청 실패 (${seq}) →`, e.message);
        }
      }

      if (items.length) {
        const result = await collection.insertMany(items);
        console.log(`✅ ${category}: ${result.insertedCount}개 저장 완료`);
      } else {
        console.log(`⚠️ ${category}: 저장할 항목 없음`);
      }
    }
  } finally {
    await client.close();
    console.log('\n🔚 MongoDB 연결 종료');
  }
}

crawlAndInsert();
