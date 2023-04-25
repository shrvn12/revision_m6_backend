const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user : { type: Object, ref: 'User' },
    flight : { type: Object, ref: 'Flight' }
})

const bookingModel = mongoose.model('bookings',bookingSchema);

module.exports = {
    bookingModel
}