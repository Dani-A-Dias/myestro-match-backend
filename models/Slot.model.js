const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const slotSchema = new Schema({
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Studios",
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
  reserved: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Slot = model("Slot", slotSchema);
module.exports = Slot;
