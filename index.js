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
app.post('/product', function(req, res) {
    const body = req.body
    console.log('body: ', body);
    Product.create(body)
        .then((doc => {
            console.log('doc: ', doc);
            res.json(doc)
        }))
        .catch(err => {
            console.log('err: ', err);
            res.json(err)
        })
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
app.get('/', manageRequest)
app.get('/', (req, res) => {
    res.send('Ciao')
})

app.listen(8080, () => console.log('Server run in port 8080'))