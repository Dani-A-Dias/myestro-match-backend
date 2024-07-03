const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usersSchema = new Schema({
	fullname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	phone_number: { type: String },
	password: { type: String, required: true },
	experience_level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
	userImage: {
		type: String,
		default:
			'https://pm1.aminoapps.com/7227/5537c41e2380ea4f5c19e8d6b12a53be42324525r1-900-1125v2_00.jpg',
	},
	member_since: { type: Date, default: Date.now },
	instrument: { type: String },
});

const User = model('User', usersSchema);

module.exports = User;
