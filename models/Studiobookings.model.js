const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studios",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
    date: Date,
    status: {
      type: String,
      enum: ["Booked", "Completed", "Canceled"],
      default: "Booked",
    },
    start_time: {
      type: Number,
      required: true,
    },
    day_of_week: {
      type: [String],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  },
  { timestamp: true }
);

const StudioBooking = model("StudioBookings", bookingSchema);

module.exports = StudioBooking;
