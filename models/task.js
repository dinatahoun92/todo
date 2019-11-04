const mongoose = require('mongoose')
const validator = require('validator')

var Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        trim: true,
        default: false,
    },

});
module.exports = Task