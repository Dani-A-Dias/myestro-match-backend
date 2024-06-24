const mongoose = require('mongoose');
const { Schema, model } = mongoose; 

const studioSchema = new Schema({});

const Studio = model('Studios', studioSchema);

module.exports = Studio;
