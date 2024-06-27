const router = require('express').Router();
const UserModel = require('../models/Users.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const uploader = require('../middleware/cloudinary.config');

//Sign Up new User
router.post('/signup', uploader.single('imageUrl'), async (req, res) => {
	let userImage = '';
	if (req.file) {
		userImage = req.file.path;
	}
	try {
		//Looks for an existing user
		const foundUser = await UserModel.findOne({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		});
		if (foundUser) {
			res.status(500).json({
				errorMessage: 'That username/email already exists, please use another.',
			});
		} else {
			//Hashes the password
			const salt = bcryptjs.genSaltSync(10);
			const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
			//Creates a new user
			const newUser = await UserModel.create({
				...req.body,
				password: hashedPassword,
				userImage,
			});
			// Adds a token to the sign up so it's not necessary to login after
			const token = jwt.sign(
				{ userId: newUser._id, username: newUser.username },
				process.env.TOKEN_SECRET,
				{ algorithm: 'HS256', expiresIn: '6h' }
			);
			res.status(201).json({ user: newUser, token });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ errorMessage: 'Internal server error' });
	}
});

//Login existing user

router.post('/login', async (req, res) => {
	try {
		const findUser = await UserModel.findOne({ username: req.body.username });
		if (findUser) {
			//Check if passwords exists
			const passwordMatch = bcryptjs.compareSync(
				req.body.password,
				findUser.password
			);
			if (passwordMatch) {
				const loggedInUser = {
					_id: findUser._id,
					user: findUser.username,
				};
				const authToken = jwt.sign(loggedInUser, process.env.TOKEN_SECRET, {
					algorithm: 'HS256',
					expiresIn: '6h',
				});
				res.status(200).json({ message: 'Login successful!', authToken });
			} else {
				console.log('Wrong password'); //just for us, delete after
				res.status(500).json({ errorMessage: 'Wrong credentials!' });
			}
		} else {
			console.log('Wrong username'); //just for us, delete after
			res.status(500).json({ errorMessage: 'Wrong credentials!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ errorMessage: 'User does not exist' });
	}
});

router.get('/verify', isAuthenticated, (req, res) => {
	if (req.payload) {
		res.status(200).json({ message: 'Valid Tolkien', user: req.payload });
	} else {
		res.status(401).json({ errorMessage: 'Invalid Tolkien' });
	}
});

router.get('/profile/:userId', async (req, res) => {
	try {
		const currUser = await UserModel.findById(req.params.userId);
		res.status(200).json(currUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errorMessage: 'Failed to fetch user information' });
	}
});

module.exports = router;
