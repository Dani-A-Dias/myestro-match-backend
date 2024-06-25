const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String, required: true },
  experience_level: { type: String, enum: ["One", "Two", "Three"] },
  picture: { type: String },
  member_since: { type: Date, default: Date.now },
  instrument: {type:String},
});

const User = model("User", usersSchema);

module.exports = User;
