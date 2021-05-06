const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const cloudinary = require('cloudinary').v2


//Product Creation Route

router.post(
    '/add',             // //http://www.myapp.com/product/
    (req, res) => {

        // Capture the data in the BODY section
        const formData = {
            productname: req.body.productname,
            details: req.body.details,
            price: req.body.price,
            imageurl: req.body.imageurl,
        };

        // Instantiate an instance of the ProductsModel constructor
        const newProductModel = new ProductsModel(formData);

        // Using newProductModel object to save to the database 
        ProductsModel
        .findOne({ productname: formData.productname })
        .then(
            async (dbDocument) => {

                if (dbDocument) {
                        // Then reject registration
                        res.send("Sorry. An account with thay email already exists");
                    }else {
                if (Object.values(req.files).length > 0) {
                    const files = Object.values(req.files);

                    await cloudinary.uploader.upload(
                        files[0].path,
                        (cloudinaryErr, cloudinaryResult) => {
                            //add the url of the picture to new user model
                            if (cloudinaryErr) {
                                console.log(cloudinaryErr);
                            }
                            //add the url of hte picture to newUserModel
                            newProductModel.imageurl = cloudinaryResult.url;
                            console.log(cloudinaryResult.url)

                        }

                    )
                }

                newProductModel.save()
                // If Promise resolves...
                .then(
                    (dbDocument) => {
                        

                        res.send(dbDocument)
                    }
                )
                // If Promise rejects...
                .catch(
                    (error) => {
                        res.json(error)
                    }
                )
        }})
    }
);


//Product Update Route

router.post(
    '/update',
    (req, res) => {

        ProductsModel
        .findOneAndUpdate(
            {
                'productname': req.body.productname
            },
            {
                $set: {
                    price: req.body.price
                }
            }
        )
        .then(
            (dbDocument) => {
                res.send(dbDocument)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }
)
// Product listing
router.get(
    '/list',                 
    (req, res) => {
        ProductsModel
        .find()
        .then(
            (dbDocuments) => {
                res.send(dbDocuments)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )

    }
);

module.exports = router;
