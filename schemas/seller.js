const mongoose = require('mongoose')

// Create Schema
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: true
    // }
})

// Create Model
mongoose.model('Seller', sellerSchema)

// exports.sellerSchema = sellerSchema