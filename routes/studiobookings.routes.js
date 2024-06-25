const StudioBooking = require("../models/Studiobookings.model");
const Studios = require("../models/Studios.model");
const router = require("express").Router();

router.post("/api/studio-booking", async (req, res, next) => {
  try {
    const createStudioBooking = await StudioBooking.create(req.body);
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

module.exports = router;
