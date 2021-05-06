const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };
const WishlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
    }
    , opts)
const WishlistModel = new mongoose.model('wishlists', WishlistSchema)
module.exports = WishlistModel
