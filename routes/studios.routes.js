const router = require("express").Router();
const Studios = require("../models/Studios.model");
const Rating = require('../models/Rating.model');

router.post("/api/studios", async (req, res, next) => {
  try {
    const createStudio = await Studios.create(req.body);
    res.status(201).json(createStudio);
  } catch (error) {
    next(error);
  }
});

router.get("/api/studios/:studioId", async (req, res) => {
  const { studioId } = req.params;
  try {
    const foundStudio = await Studios.findById(studioId).populate("slot");
    if (foundStudio) {
      res.status(200).json({ message: "Studio found", foundStudio });
    } else {
      res.status(404).json({ errorMessage: "Studio not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Server error!" });
  }
});

router.get("/api/studios", async (req, res, next) => {
  try {
    const findAllStudios = await Studios.find();
    console.log(findAllStudios);
    res.status(200).json(findAllStudios);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Route to score studio
router.post('/api/studio/:id/rate', async (req, res) => {
  const userId = req.user._id;
  const studioId = req.params.id;
  const { type } = req.body;

  try {
    const existingRating = await Rating.findOne({ user: userId, studio: studioId });

    if (existingRating) {
      return res.status(400).json({ message: 'User has already rated this studio' });
    }

    const rating = new Rating({ user: userId, studio: studioId, type });
    await rating.save();

    const update = type === 'positive' ? { $inc: { positive_scoring: 1 }, $push: { ratings: rating._id } } : { $inc: { negative_scoring: 1 }, $push: { ratings: rating._id } };
    await Studios.findByIdAndUpdate(studioId, update, { new: true });

    res.status(200).json({ message: 'Rating added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to rate studio' });
  }
});
module.exports = router;
