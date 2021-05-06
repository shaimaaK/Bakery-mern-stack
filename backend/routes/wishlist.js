const express = require('express');
const ProductsModel = require('../models/ProductsModel');
const WishlistModel = require('../models/WishListModel');
const router = express.Router();



//Product remove from wishlist

router.post(
    '/add',             // //http://www.myapp.com/product/
    (req, res) => {

        // Capture the data in the BODY section
        const formData = {
            productId: req.body.productId,
            userId: req.body.userId,
        }

        // Instantiate an instance of the ProductsModel constructor
        const newWishlist = new WishlistModel(formData);

        // Using newProductModel object to save to the database 
        newWishlist
            .save()
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
    }
);

router.post(
    '/remove',             // //http://www.myapp.com/product/
    (req, res) => {

        // Capture the data in the BODY section
        const item = {
            productId: req.body.productId,
            userId: req.body.userId,
        }
        // Using newProductModel object to save to the database 
        WishlistModel
            .deleteOne(item)
            // If Promise resolves...
            .then(
                (dbDocument) => {
                    res.send({ success: true })
                }
            )
            // If Promise rejects...
            .catch(
                (error) => {
                    res.json(error)
                }
            )
    }
);

// wishlist
router.post(
    '/all',
    (req, res) => {
        console.log(req.body)
        WishlistModel
            .find({ userId: req.body.userId })
            .then((dbDocuments) => {
                let ids = dbDocuments.map(i => i.productId)
                ProductsModel.find({
                    '_id': {
                        $in: ids
                    }
                }).then(dbDocuments => {
                    res.send(dbDocuments)

                }).catch(error => res.send(error))
            })
            .catch(
                (error) => {
                    console.log(error)
                }
            )

    }
);

module.exports = router;
