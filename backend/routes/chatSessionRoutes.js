const express = require('express');

const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');
const Summary = require('../models/Summary');

router.post('/session', verifyToken, async (req, res) => {
  const { title } = req.body;

  try {
    const session = new ChatSession({
      userId: req.user.userId,
      title,
    });

    await session.save();
    res.status(201).json({ session });
  } catch (err) {
    res.status(500).json({ message: 'session creation failed', error: err.message });
  }
});

router.get('/sessions', verifyToken, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    const filtered = [];

    for (const session of sessions) {
      const hasMessages = await ChatMessage.exists({ chatId: session._id.toString() });
      if (hasMessages) {
        filtered.push(session);
      }
    }

    res.json({ sessions: filtered });
  } catch (err) {
    console.error('failed to load sessions:', err);
    res.status(500).json({ error: 'failed to load sessions' });
  }
});

router.delete('/session/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await ChatSession.findByIdAndDelete(id);
    await ChatMessage.deleteMany({ chatId: id });
    await Summary.deleteOne({ chatId: id });

    res.json({ message: 'session deleted' });
  } catch (err) {
    console.error('failed to delete session:', err);
    res.status(500).json({ error: 'failed to delete session', detail: err.message });
  }
});

router.put('/session/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }

  try {
    const updated = await ChatSession.findByIdAndUpdate(id, { title }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'session not found' });
    }

    res.json({ message: 'session updated', session: updated });
  } catch (err) {
    console.error('failed to update session title:', err);
    res.status(500).json({ error: 'server error', detail: err.message });
  }
});

module.exports = router;
