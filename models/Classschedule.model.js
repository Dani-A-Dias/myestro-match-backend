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
      enum: ["Scheduled", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamp: true }
);

const ClassSchedule = model("Schedules", classScheduleSchema);

module.exports = ClassSchedule;
