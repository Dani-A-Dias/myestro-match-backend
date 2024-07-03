const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teachers' },
  studio: { type: mongoose.Schema.Types.ObjectId, ref: 'Studios' },
  type: { type: String, enum: ['positive', 'negative'], required: true },
}, { timestamps: true });

const Rating = model('Rating', ratingSchema);

module.exports = Rating;