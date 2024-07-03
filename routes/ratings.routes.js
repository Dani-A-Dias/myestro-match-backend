const Studio = require('../models/Studios.model');
const Teacher = require('../models/Teachers.model');
const router = require('express').Router();

//Route to score teachers
router.patch('/api/:userId/rate/:teacherId', async (req, res, next) => {
	const { userId, teacherId } = req.params;
	const { rating } = req.body;
	try {
		const teacher = await Teacher.findById(teacherId);
		if (teacher.user_already_rated.includes(userId)) {
			return res
				.status(400)
				.json({ message: 'User has already rated this teacher' });
		}
		if (rating === 'positive') {
			teacher.positive_scoring += 1;
		} else if (rating === 'negative') {
			teacher.negative_scoring += 1;
		} else {
			return res.status(400).json({ message: 'Invalid rating value' });
		}
		teacher.user_already_rated.push(userId);
		await teacher.save();

		res.status(200).json(teacher);
	} catch (error) {
		next(error);
	}
});

//Route to score studios
router.patch('/api/:userId/rate/:studioId', async (req, res, next) => {
	const { userId, studioId } = req.params;
	const { rating } = req.body;
	try {
		const studio = await Studio.findById(studioId);
		if (studio.user_already_rated.includes(userId)) {
			return res
				.status(400)
				.json({ message: 'User has already rated this studio' });
		}
		if (rating === 'positive') {
			studio.positive_scoring += 1;
		} else if (rating === 'negative') {
			studio.negative_scoring += 1;
		} else {
			return res.status(400).json({ message: 'Invalid rating value' });
		}
		studio.user_already_rated.push(userId);
		await studio.save();

		res.status(200).json(studio);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
