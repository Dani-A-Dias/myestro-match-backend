const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studios",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Booked", "Completed"], default: "Booked" },
  },
  { timestamp: true }
);

const StudioBooking = model("StudioBookings", bookingSchema);

module.exports = StudioBooking;
