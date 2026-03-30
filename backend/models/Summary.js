const mongoose = require('mongoose');

const { Schema } = mongoose;

const summarySchema = new Schema({
  chatId: { type: String, required: true },
  summary: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Summary', summarySchema);
