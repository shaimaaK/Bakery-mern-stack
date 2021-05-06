const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };
const ReservationsSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        day:{
            type: String,
        },
        time:{
            type: String,
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
        
    }
    , opts)
const ReservationsModel = new mongoose.model('reservations', ReservationsSchema)
module.exports = ReservationsModel