const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const studioSchema = new Schema({
	studio_name: { type: String, required: true },
	address: { type: String, required: true },
	description: { type: String, required: true },
	rental_price: { type: Number, required: true },
	contact_phone: { type: Number, required: true },
	contact_email: { type: String, required: true },
	picture: { type: String, required: true },
	schedule: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bookings',
	},
	slot: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Slot',
	},
	positive_scoring: {
		type: Number,
		default: 0,
		min: 0,
	},
	negative_scoring: {
		type: Number,
		default: 0,
		min: 0,
	},
	ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

const Studio = model('Studios', studioSchema);

module.exports = Studio;
