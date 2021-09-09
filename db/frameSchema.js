const mongoose = require('mongoose');

const frameSchema = new mongoose.Schema({
    _id: { type: Number, unique:true, required: true},
    name: { type: String, required: true},
    bit1: {type: String, required: true},
    bit2: {type: String, required: true}
});

const model = mongoose.model('frames', frameSchema);

module.exports = model;