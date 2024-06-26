require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
require('./config')(app);
const mongoose = require('mongoose');
const morgan = require('morgan');
const {
	errorHandler,
	notFoundHandler,
} = require('./middleware/error-handling');

//Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());


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
