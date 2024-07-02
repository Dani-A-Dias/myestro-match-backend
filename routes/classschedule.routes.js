const ClassSchedule = require('../models/Classschedule.model');
const Availability = require('../models/Availability.model');
const Teacher = require('../models/Teachers.model');
const router = require('express').Router();
//This is being used
router.post('/api/class-schedule', async (req, res, next) => {
	try {
		const { user, teacher, start_time, day_of_week, availability } = req.body;

		const createClassSchedule = await ClassSchedule.create({
			user,
			teacher,
			start_time,
			day_of_week,
			availability,
		});

		await Availability.findByIdAndUpdate(availability, {
			$set: { reserved: true },
		});

		res.status(201).json(createClassSchedule);
	} catch (error) {
		console.log(error);
		next(error);
	}
});
//This is being used
router.get('/api/class-schedule/:scheduleId', async (req, res, next) => {
	const { scheduleId } = req.params;
	try {
		const getClassSchedule = await ClassSchedule.findById(scheduleId).populate(
			'teacher'
		);
		console.log(getClassSchedule);
		res.status(200).json(getClassSchedule);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/api/class-schedule', async (req, res, next) => {
	const { userId } = req.query;
	try {
		const query = userId ? { user: userId } : {};
		const findAllClassSchedules = await ClassSchedule.find(query).populate(
			'teacher'
		);
		console.log(findAllClassSchedules);
		res.status(200).json(findAllClassSchedules);
	} catch (error) {
		console.log(error);
		next(error);
	}
});
router.put('/api/class-schedule/:ClassScheduleId', async (req, res, next) => {
	const { ClassScheduleId } = req.params;
	const { start_time, day_of_week, availability: newAvailabilityId } = req.body;

	try {
		const oldSchedule = ClassSchedule.findById(ClassScheduleId);
		const oldAvailabilityId = oldSchedule.availability;
		if (oldAvailabilityId) {
			await Availability.findByIdAndUpdate(oldAvailabilityId, {
				reserved: false,
			});
		}
		await Availability.findByIdAndUpdate(newAvailabilityId, { reserved: true });

		const updatedSchedule = await ClassSchedule.findByIdAndUpdate(
			ClassScheduleId,
			{ start_time, day_of_week, availability: newAvailabilityId },
			{ new: true }
		).populate('teacher');

		res.status(201).json(updatedSchedule);
	} catch (error) {
		console.error('Error while updating class schedule', error);
		next(error);
	}
});

router.patch('/api/class-schedule/:ClassScheduleId', async (req, res, next) => {
	const { ClassScheduleId } = req.params;
	try {
		const updateScheduleComplete = await ClassSchedule.findByIdAndUpdate(
			ClassScheduleId,
			req.body,
			{
				new: true,
			}
		).populate('teacher');
		if (updateScheduleComplete && updateScheduleComplete.availability) {
			await Availability.findByIdAndUpdate(
				updateScheduleComplete.availability,
				{
					reserved: false,
				}
			);
		}
		res.status(201).json(updateScheduleComplete);
	} catch (error) {
		console.error('Error while updating class schedule', error);
		next(error);
	}
});

//This is being used
router.delete('/api/class-schedule/:ClassScheduleId', (req, res, next) => {
	ClassSchedule.findByIdAndDelete(req.params.ClassScheduleId)

		.then((deletedClassSchedule) => {
			console.log('Deleted class schedule', deletedClassSchedule);
			res
				.status(200)
				.json(
					`Class Schedule with id ${req.params.ClassScheduleId} was deleted`
				);
			const availabilityId = deletedClassSchedule.availability;

			if (availabilityId) {
				return Availability.findByIdAndUpdate(availabilityId, {
					$set: { reserved: false },
				})
					.then(() => {
						console.log('Updated availability to not reserved');
					})
					.catch((error) => {
						console.error('Error while updating availability', error);
					});
			}
		})
		.catch((error) => {
			console.error('Error while deleting class schedule)', error);
		});
});
//This is being used
router.post('/api/availability', async (req, res, next) => {
	try {
		const createAvailability = await Availability.create(req.body);
		const updatedTeacher = await Teacher.findByIdAndUpdate(
			createAvailability.teacher,
			{ $push: { availability: createAvailability._id } },
			{ new: true }
		);
		console.log(updatedTeacher);
		res.status(201).json(createAvailability);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/api/availability/:teacherId', async (req, res, next) => {
	const { teacherId } = req.params;
	try {
		const currentTeacher = await Teacher.findById(teacherId).populate(
			'availability'
		);
		console.log(currentTeacher);
		res.status(200).json(currentTeacher);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
