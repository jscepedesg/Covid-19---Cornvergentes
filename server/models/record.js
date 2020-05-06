const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recordSchema = new Schema({
    idUser: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', required: false
    },
    idSymptoms: { 
        type: Schema.Types.ObjectId, 
        ref: 'symptom', required: false
    }
});

module.exports = mongoose.model('record', recordSchema);