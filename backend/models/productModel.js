const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    ratings: {
        type: Number,
        default: 0
    },
    noOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true,
            },
            name: {
                type: String,
                required: [true, "Enter your name"]
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
})


const productModel = mongoose.model("product", productSchema)


module.exports = productModel;