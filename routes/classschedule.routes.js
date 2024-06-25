const ClassSchedule = require("../models/Classschedule.model");
const Teacher = require("../models/Teachers.model")
const router = require("express").Router();

router.post("/api/class-schedule", async (req, res, next) => {
    try {
      const createClassSchedule = await ClassSchedule.create(req.body);
      res.status(201).json(createClassSchedule);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.get("/api/class-schedule/:scheduleId", async (req, res, next) => {
  const { scheduleId } = req.params;
  try {
    const getClassSchedule = await ClassSchedule.findById(scheduleId).populate("teacher");
    console.log(getClassSchedule);
    res.status(200).json(getClassSchedule);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/class-schedule", async (req, res, next) => {
  try {
    const findAllClassSchedules = await ClassSchedule.find().populate("teacher");
    console.log(findAllClassSchedules);
    res.status(200).json(findAllClassSchedules);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/api/class-schedule/:ClassScheduleId", (req, res, next) => {
  ClassSchedule.findByIdAndUpdate(req.params.ClassScheduleId, req.body, {
    new: true,
  })
    .then((updatedClassSchedule) => {
      console.log("Updated class schedule", updatedClassSchedule);
      res.status(201).json(updatedClassSchedule);
    })
    .catch((error) => {
      console.error("Error while updating class schedule", error);
      next(error);
    });
});

router.delete("/api/class-schedule/:ClassScheduleId", (req, res, next) => {
  ClassSchedule.findByIdAndDelete(req.params.ClassScheduleId)
  .then((deletedClassSchedule) => {
    console.log("Deleted class schedule", deletedClassSchedule);
    res
      .status(200)
      .json(`Class Schedule with id ${req.params.ClassScheduleId} was deleted`);
  })
  .catch((error) => {
    console.error("Error while deleting class schedule)", error);
  });
});

module.exports = router;
