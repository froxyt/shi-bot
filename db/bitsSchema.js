const mongoose = require('mongoose');

const bitsSchema = new mongoose.Schema({
    name: { type: String, required: true},
});

const model = mongoose.model('bits', bitsSchema);

module.exports = model;