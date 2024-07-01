const StudioBooking = require("../models/Studiobookings.model");
const Studios = require("../models/Studios.model");
const router = require("express").Router();
const Slot = require("../models/Slot.model");

router.post("/api/studio-booking", async (req, res, next) => {
  try {
    const { user, studio, start_time, day_of_week, slot } = req.body;
    const createStudioBooking = await StudioBooking.create({
      user,
      studio,
      start_time,
      day_of_week,
      slot,
    });

    await Slot.findByIdAndUpdate(slot, {
      $set: { reserved: true },
    });

    res.status(201).json(createStudioBooking);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/studio-booking/:StudioBookingId", async (req, res, next) => {
  const { StudioBookingId } = req.params;
  try {
    const getStudioBooking = await StudioBooking.findById(
      StudioBookingId
    ).populate("studio");
    console.log(getStudioBooking);
    res.status(200).json(getStudioBooking);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/studio-booking", async (req, res, next) => {
  try {
    const findAllStudioBookings = await StudioBooking.find().populate("studio");
    console.log(findAllStudioBookings);
    res.status(200).json(findAllStudioBookings);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/api/studio-booking/:StudioBookingId", (req, res, next) => {
  StudioBooking.findByIdAndUpdate(req.params.StudioBookingId, req.body, {
    new: true,
  })
    .then((updatedStudioBooking) => {
      console.log("Updated studio booking", updatedStudioBooking);
      res.status(201).json(updatedStudioBooking);
    })
    .catch((error) => {
      console.error("Error while updating studio booking", error);
      next(error);
    });
});

router.delete("/api/studio-booking/:StudioBookingId", (req, res, next) => {
  StudioBooking.findByIdAndDelete(req.params.StudioBookingId)
    .then((deletedStudioBooking) => {
      console.log("Deleted studio booking", deletedStudioBooking);
      res
        .status(200)
        .json(
          `studio booking with id ${req.params.StudioBookingId} was deleted`
        );
    })
    .catch((error) => {
      console.error("Error while deleting studio booking)", error);
    });
});

router.post("/api/slot", async (req, res, next) => {
  try {
    const createSlot = await Slot.create(req.body);
    const updatedStudio = await Studios.findByIdAndUpdate(
      createSlot.studio,
      { $push: { slot: createSlot._id } },
      { new: true }
    );
    console.log(updatedStudio);
    res.status(201).json(createSlot);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/api/slot/:studioId", async (req, res, next) => {
  const { studioId } = req.params;
  try {
    const currentStudio = await Studios.findById(studioId).populate("slot");
    console.log(currentStudio);
    res.status(200).json(currentStudio);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
