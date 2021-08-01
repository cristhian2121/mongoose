const mongoose = require('mongoose')

// Create Schema
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [10, 'Min len 10']
    },
    // Add subdocuments
    info: [
        new mongoose.Schema({
            address: {
                type: String,
                required: true
            },
            antiguate: {
                type: Number,
                required: true
            }
        })
    ]
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: true
    // }
})

// Create Model
mongoose.model('Seller', sellerSchema)

// exports.sellerSchema = sellerSchema