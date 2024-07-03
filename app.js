require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
require('./config')(app);
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const {
	errorHandler,
	notFoundHandler,
} = require('./middleware/error-handling');
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

//Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(
	cors({
		origin: [FRONTEND_URL], 
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
);

// Requires
const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const studiosRoutes = require('./routes/studios.routes');
const teachersRoutes = require('./routes/teachers.routes');
const scheduleRoutes = require('./routes/classschedule.routes');
const bookingRoutes = require('./routes/studiobookings.routes');

// 👇 Routes here
app.use('/api', indexRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/studios', studiosRoutes);
app.use('/teachers', teachersRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/bookings', bookingRoutes);

// ❗ Error Handling
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
