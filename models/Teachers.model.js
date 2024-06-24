const mongoose = require('mongoose');
const { Schema, model } = mongoose.Schema;

const teachersSchema = new Schema({});

const Teacher = model('Teachers', teachersSchema);

module.exports = Teacher;