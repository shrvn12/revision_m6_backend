const express = require('express');
const { flightModel } = require('../models/flight.model');
const { bookingModel } = require('../models/booking.model');
const { authenticator } = require('../middlewares/authenticator');

const bookingRouter = express.Router();

bookingRouter.post('/booking',authenticator,async (req, res) => {
    const {user, flightId} = req.body;
    if(!flightId){
        return res.status(402).send({msg:'Please provide flight ID'});
    }
    const flight = await flightModel.find({_id:flightId});
    const payload = {user, flight: flight[0]}
    const booking = new bookingModel(payload);
    await booking.save();
    res.status(201).send({msg:'Booking successful 🎫'});
})

bookingRouter.get('/dashboard',authenticator,async (req, res) => {
    const bookings = await bookingModel.find();
    res.status(200).send({length:bookings.length, data: bookings});
})

module.exports = {
    bookingRouter
}