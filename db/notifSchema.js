const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    isAuto: { type: Boolean, required: true },
    contribution: { type: Array, default: [] },
    pingDrop: { type: Array, default: [] },
});

const model = mongoose.model('notification', notifSchema);

module.exports = model;