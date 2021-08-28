//require express router
const router = require('express').Router();
// require product model
const Product = require('../db/models/product.model');
const Category = require('../db/models/category.model');
const User = require('../db/models/user.model');
const responseCreator = require('../helpers/response.helper')


// add product
router.post('/add', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.body.category });
        const user = await User.findOne({ _id: req.body.seller });
        if (!category) {
            return res.status(400).send(responseCreator(400, null, 'Category not found'));
        }
        if (!user) {
            return res.status(400).send(responseCreator(400, null, 'User not found'));
        }
        if(user.isSeller === true){
            const product = new Product(req.body);
            await product.save();
            res.status(201).send(responseCreator(201, product, 'Product added successfully'));
        }else{
            return res.status(400).send(responseCreator(400, null, 'You are not a seller'));
        }
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

// get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

// get product by id
router.get('/:id', async (req, res) => {
    try {
        // find product by id and populate category and seller
        const product = await Product.findById(req.params.id).populate('category').populate('seller');
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        res.status(200).send(responseCreator(200, product, 'Product found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});


// update product
router.put('/update/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        res.status(200).send(responseCreator(200, product, 'Product updated successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});


//delete product
router.delete('/delete/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        res.status(200).send(responseCreator(200, product, 'Product deleted successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

//count products
router.get('/count', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if(!count) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, count, 'Products count successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

//get Featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await Product.find({featured: true}).populate('category').populate('seller');
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

//get discounted products
router.get('/discounted', async (req, res) => {
    try {
        const products = await Product.find({discount: true}).populate('category').populate('seller');
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

module.exports = router;