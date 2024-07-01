const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classScheduleSchema = new Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: Date,
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Canceled"],
      default: "Scheduled",
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
    availability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
      required: true,
    },
  },
  { timestamp: true }
);

const ClassSchedule = model("Schedules", classScheduleSchema);

module.exports = ClassSchedule;
