const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const chatRoutes = require('./routes/chatRoutes');
const chatSessionRoutes = require('./routes/chatSessionRoutes');
const chatSummaryRoutes = require('./routes/chatSummaryRoutes');
const hyperclovaRoutes = require('./routes/hyperclovaRoutes');
const lawRoutes = require('./routes/lawRoutes');
const caseRoutes = require('./routes/caseRoutes');
const precRoutes = require('./routes/precRoutes');
const qaRoutes = require('./routes/qaRoutes');

dotenv.config();

const PORT = process.env.PORT || 5050;
const FRONT_BASE = process.env.FRONT_BASE || 'http://localhost:3000';
const app = express();

app.use(
  cors({
    origin: FRONT_BASE,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ICNA legal chatbot backend is running');
});

app.use('/api/hyperclova', hyperclovaRoutes);
app.use('/chat', chatRoutes);
app.use('/chat-sessions', chatSessionRoutes);
app.use('/summary', chatSummaryRoutes);
app.use('/law', lawRoutes);
app.use('/case', caseRoutes);
app.use('/prec', precRoutes);
app.use('/api/qa', qaRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
