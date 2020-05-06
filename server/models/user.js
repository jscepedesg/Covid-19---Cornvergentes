const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'The firstName is necessary']
    },
    lastName: {
        type: String,
        required: [true, 'The lastName is necessary']
    },
    email: {
        type: String,
        unique: [true,'Email it must be unique'],
        required: [true, 'Email is necessary']
    },
    birthday: {
        type: Date,
        required: [true, 'The birthday is necessary']
    }
});

module.exports = mongoose.model('User', userSchema);