const router = require('express').Router();
const UserModel = require('../models/Users.model');
const uploader = require('../middleware/cloudinary.config');

router.get('/api/users/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const foundUser = await UserModel.findById(id);

		if (foundUser) {
			res.status(200).json({ message: 'User found', foundUser });
		} else {
			res.status(404).json({ errorMessage: 'User not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ errorMessage: 'Internal server error' });
	}
});

router.patch('/api/users/:id', uploader.single('imageUrl'), async (req, res) => {
	const { id } = req.params;

	try {
		const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ message: 'Error updating user', error });
	}
});

module.exports = router;
