const express = require('express');
const { connection } = require('./configs/db');
require('dotenv').config();
const cors = require('cors');
const { userRouter } = require('./routes/user.router');
const { flightRouter } = require('./routes/flight.router');
const { bookingRouter } = require('./routes/booking.router');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).send({msg:'Basic API endpoint'});
})

app.use('/api',userRouter);
app.use('/api',flightRouter);
app.use('/api',bookingRouter)

app.listen(process.env.port,async () => {
    try {
        await connection
        console.log('Connected to DB ✅');
    } 
    catch (error) {
        console.log('Error while connecting to DB ❌');
        console.log(error);
    }
    console.log(`Running at port ${process.env.port}🏃🏻`);
})

/*
 405 Method Not Allowed
 403 Forbidden
 406 Not Acceptable
 411 Length Required
*/