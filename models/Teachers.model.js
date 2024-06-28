const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teachersSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  instrument: { type: String, required: true },
  attendance_type: {
    type: [String],
    required: true,
    enum: ["remote", "in-person"],
  },
  description: { type: String },
  picture: { type: String },
  price_per_session: { type: Number, default: 0 },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedules",
  },
  availability: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Availability",
  },
});

const Teacher = model("Teachers", teachersSchema);

module.exports = Teacher;
