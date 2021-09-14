const mongoose = require('mongoose');

const charactersSchema = new mongoose.Schema({
    name: { type: String, required: true, index:true},
    series: { type: String, required: true },
    code: { type: Array, default: [] },
    talk: { type: Array, default: [] },
    added_by: { type: String, required: true },
    updated_by: { type: String, required: true },
});

const model = mongoose.model('characters', charactersSchema);

module.exports = model;