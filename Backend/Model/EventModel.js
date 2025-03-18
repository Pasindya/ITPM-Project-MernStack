const shortid = require('shortid'); // Import shortid
const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const EventSchema = new Schema({
    _id: {
        type: String,
        default: function () {
            return 'EVT-' + shortid.generate(); // Prefix + unique ID
        }
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Number: {
        type: String,
        required: true,
    },
    Gmail: {
        type: String,
        required: true,
    },
    NumberAdult: {
        type: Number,
        required: true,
    },
    Date: {
        type: String, 
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    EventCategory: {
        type: String,
        required: true,
    },

});

module.exports = mongooes.model(
    "EventModel",
     EventSchema
);