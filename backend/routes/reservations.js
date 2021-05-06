const express = require('express')
const router = express.Router()
const ReservationsModel = require('../models/ReservationsModel')
require('dotenv').config()

router.post(
    '/', (req, res) => 
    {
        const formData = {
            name: req.body.name,
            day: req.body.day,
            time: req.body.time,
        };
        const newReservationModel= new ReservationsModel(formData)
        ReservationsModel.find()
            .then(
                dbDocument =>
                {
                    if (dbDocument.length > 100)
                        res.send("full no place")
                    else{
                        newReservationModel.save()
                            .then
                            (
                                dbDocument =>
                                res.json(dbDocument)
                            )
                            .catch(
                                err =>
                                res.send(err)
                            )
                        }
                        
                    
                }

                
            )
            .catch(
                err =>
                res.send(err)
            )

        
    }
)
module.exports = router