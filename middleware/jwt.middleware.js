const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Token not provided');
		}
		const payload = jwt.verify(token, process.env.TOKEN_SECRET);
		req.payload = payload;

		next();
	} catch (error) {
		console.log('Authentication error:', error);
		res.status(401).json({ errorMessage: 'token not provided or not valid' });
	}
};

module.exports = {
	isAuthenticated,
};
