const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let symptomsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The Name is necessary']
    }
});

module.exports = mongoose.model('symptom', symptomsSchema);