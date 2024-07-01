const config = require('config');
const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

// permet fer servir JSON
app.use(express.json())

app.get('/', (req, res) => {
   res.send('Hello World')
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        if(!product) {
            res.status(404).json({message: "Product not found"});
        } else {
            const updatedProduct = await Product.findById(id);
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
 

mongoose.connect(config.get('mongodb.uri'))
.then(() => {
    console.log('Connected to mongodb database!');
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    });
})
.catch(() => {
    console.log('Connection to mongodb database failed!')
    }
);