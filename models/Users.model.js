const mongoose = require('mongoose');
const { Schema, model } = mongoose.Schema;

const usersSchema = new Schema({});

const User = model('Users', usersSchema);

module.exports = User;
