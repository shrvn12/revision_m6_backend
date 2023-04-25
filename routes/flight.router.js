const express = require('express');
const { idValidator } = require('../middlewares/id.validator');
const { flightModel } = require('../models/flight.model');

const flightRouter = express.Router();

flightRouter.get('/flights',async (req, res) => {
    const flights = await flightModel.find();
    res.status(200).send({length: flights.length,data: flights});
})

flightRouter.get('/flights/:id',idValidator,async (req, res) => {
    const _id = req.params.id;
    const flights = await flightModel.find({_id});
    if(!flights.length){
        return res.status(404).send({msg:`Flight with id:${_id} does not exist`});
    }
    res.status(200).send({length: flights.length,data: flights});
})

flightRouter.post('/flights',async (req, res) => {
    const {airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price} = req.body

    let payload = {
        airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price
    }

    for(let key in payload){
        if(!payload[key]){
            return res.send({msg:`Please provide ${key}`});
        }
    }

    let flight = new flightModel(payload);
    await flight.save();

    res.status(201).send({msg:'Flight added ✈️'});
})

flightRouter.patch('/flights/:id',idValidator,async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    await flightModel.findByIdAndUpdate(id,data);
    res.status(204).send({msg:'Flight Updated 🛫'});
})

flightRouter.put('/flights/:id',idValidator,async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    await flightModel.findByIdAndUpdate(id,data);
    res.status(204).send({msg:'Flight Updated 🛫'});
})

flightRouter.delete('/flights/:id',idValidator,async (req, res) => {
    const id = req.params.id;
    await flightModel.findByIdAndDelete(id);
    res.status(202).send({msg:'Flight Deleted 🛬'});
})



module.exports = {
    flightRouter
}