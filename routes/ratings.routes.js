const Teacher = require("../models/Teachers.model");
const Rating = require('../models/Rating.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = require("express").Router();

//Route to score teachers
router.post('/api/teacher/:id/rate/:userId', isAuthenticated, async (req, res) => {
    const {userId} = req.params;
    const teacherId = req.params.id;
    const { type } = req.body;
  
    try {
      const existingRating = await Rating.findOne({ user: userId, teacher: teacherId });
  
      if (existingRating) {
        return res.status(400).json({ message: 'User has already rated this teacher' });
      }
  
      const rating = new Rating({ user: userId, teacher: teacherId, type });
      await rating.save();
  
      const update = type === 'positive' ? { $inc: { positive_scoring: 1 }, $push: { ratings: rating._id } } : { $inc: { negative_scoring: 1 }, $push: { ratings: rating._id } };
      await Teacher.findByIdAndUpdate(teacherId, update, { new: true });
  
      res.status(200).json({ message: 'Rating added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to rate teacher' });
    }
  });
  
  router.get('/api/ratings/user/:userId/teacher/:teacherId', async (req, res) => {
    const { userId, teacherId } = req.params;
  
    try {
      const rating = await Rating.findOne({ user: userId, teacher: teacherId });
  
      if (!rating) {
        return res.status(404).json({ message: 'Rating not found' });
      }
  
      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching rating' });
    }
  });
  
  module.exports = router;
  