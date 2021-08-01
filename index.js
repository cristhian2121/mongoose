const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

require('./schemas/product')
require('./schemas/seller')

// mongoose.set({ useUnifiedTopology: true })
mongoose.connect(process.env.STRING_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const manageRequest = (req, res) => {
    res.send('hello')
}
const Product = mongoose.model('Product')
const Seller = mongoose.model('Seller')

app.use(express.json());

app.get('/', manageRequest)

// Product
app.get('/product', (req, res) => {
    Product.find()
        .populate('sellers')
        .then(doc => res.json(doc))
        .catch(error => res.json(error))
})

app.post('/product', function(req, res) {
    const body = req.body
    Product.create(body)
        .then((doc => {
            // id is put in code to easyly implementation
            return Seller.findById('6106c8d76c0b851eeca3cf96')
                .then(res => {
                    if(res) {
                        console.log('res: ', res);
                        doc.sellers.push(res._id)
                        return Product.create(doc)
                    }
                    return Promise.resolve()
                })            
        }))
        .then(doc => res.json(doc))
        .catch(err => {
            console.log('err: ', err);
            res.json(err)
        })
})

app.delete('/product', function(req, res) {
    Product.remove()
    .then(doc => res.json(doc))
    .catch(err => res.json(err))
})

// Seller
app.get('/seller', (req, res) => {
    Seller.find()
    // .populate('Seller')
        .then(doc => res.json(doc))
        .catch(error => res.json(error))
})
app.post('/seller', function(req, res) {
    const body = req.body
    Seller.create(body)
        .then((doc => {
            console.log('doc: ', doc);
            res.json(doc)
        }))
        .catch(err => {
            console.log('err: ', err);
            res.json(err)
        })
})

app.listen(8080, () => console.log('Server run in port 8080'))