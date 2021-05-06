const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };
const ProductsSchema = new mongoose.Schema(
    {
        productname:{
            type: String,
            required: true
        },
        details:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
        imageurl:{
            type: String
        }
    }
    , opts)
const ProductsModel = new mongoose.model('products', ProductsSchema)
module.exports = ProductsModel