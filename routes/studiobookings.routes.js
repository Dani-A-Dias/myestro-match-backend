const StudioBooking = require('../models/Studiobookings.model');
const Studios = require('../models/Studios.model');
const router = require('express').Router();
const Slot = require('../models/Slot.model');

//Create new booking
router.post('/api/studio-booking', async (req, res, next) => {
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

//Gets individual bookings
router.get('/api/studio-booking/:StudioBookingId', async (req, res, next) => {
	const { StudioBookingId } = req.params;
	try {
		const getStudioBooking = await StudioBooking.findById(
			StudioBookingId
		).populate('studio');
		console.log(getStudioBooking);
		res.status(200).json(getStudioBooking);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

//Gets all bookings
router.get('/api/studio-booking', async (req, res, next) => {
	const { userId } = req.query;
	try {
		const query = userId ? { user: userId } : {};
		const findAllStudioBookings = await StudioBooking.find(query).populate(
			'studio'
		);
		console.log(findAllStudioBookings);
		res.status(200).json(findAllStudioBookings);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

//Updates booking dates and changes old and new slots
router.put('/api/studio-booking/:StudioBookingId', async (req, res, next) => {
	const { StudioBookingId } = req.params;
	const { start_time, day_of_week, slot: newSlotId } = req.body;
	try {
		const oldSlot = await StudioBooking.findById(StudioBookingId);
		const oldSlotId = oldSlot.slot;
		if (oldSlotId) {
			await Slot.findByIdAndUpdate(oldSlotId, { reserved: false });
		}
		await Slot.findByIdAndUpdate(newSlotId, { reserved: true });

		const updatedBooking = await StudioBooking.findByIdAndUpdate(
			StudioBookingId,
			{ start_time, day_of_week, slot: newSlotId },
			{ new: true }
		).populate('studio');
		console.log('Updated studio booking', updatedBooking);
		res.status(201).json(updatedBooking);
	} catch (error) {
		console.error('Error while updating studio booking', error);
		next(error);
	}
});

//Good for updating only status, changes only current slot
router.patch('/api/studio-booking/:StudioBookingId', async (req, res, next) => {
	const { StudioBookingId } = req.params;
	try {
		const updatedBooking = await StudioBooking.findByIdAndUpdate(
			StudioBookingId,
			req.body,
			{ new: true }
		).populate('studio');
		if (updatedBooking && updatedBooking.slot) {
			await Slot.findByIdAndUpdate(updatedBooking.slot, { reserved: false });
		}
		res.status(201).json(updatedBooking);
	} catch (error) {
		console.error('Error while updating studio booking', error);
		next(error);
	}
});

//Deletes a booking
router.delete('/api/studio-booking/:StudioBookingId', (req, res, next) => {
	StudioBooking.findByIdAndDelete(req.params.StudioBookingId)
		.then((deletedStudioBooking) => {
			console.log('Deleted studio booking', deletedStudioBooking);
			res
				.status(200)
				.json(
					`studio booking with id ${req.params.StudioBookingId} was deleted`
				);
		})

		.then(() => {
			const slotId = deletedStudioBooking.foundStudio.slot;

			if (slotId) {
				return Slot.findByIdAndUpdate(slotId, {
					$set: { reserved: false },
				});
			}
			console.log('Updated availability to not reserved');
		})

		.catch((error) => {
			console.error('Error while deleting studio booking)', error);
		});
});

//Creates a new slot
router.post('/api/slot', async (req, res, next) => {
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

//Get slots for a certain studios
router.get('/api/slot/:studioId', async (req, res, next) => {
	const { studioId } = req.params;
	try {
		const currentStudio = await Studios.findById(studioId).populate('slot');
		console.log(currentStudio);
		res.status(200).json(currentStudio);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
