const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const availabilitySchema = new Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teachers",
    required: true,
  },
  day_of_week: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  start_time: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
  reserved_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Availability = model("Availability", availabilitySchema);
module.exports = Availability;
