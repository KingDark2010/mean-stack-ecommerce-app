const Product = require('../db/models/product.model');
const Category = require('../db/models/category.model');
const User = require('../db/models/user.model');
const responseCreator = require('../helpers/response.helper')
const fs = require('fs');

const addProduct = async (req, res) => {
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
            product.image = req.file.path;
            await product.save();
            res.status(201).send(responseCreator(201, product, 'Product added successfully'));
        }else{
            return res.status(400).send(responseCreator(400, null, 'You are not a seller'));
        }
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('seller');
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

//make upload galary function

const uploadImages = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).send(responseCreator(404, null, 'Product not found'));
        }
        if(product.images.length >= 5){
            return res.status(400).send(responseCreator(400, null, 'You can not upload more than 5 images'));
        }
        product.images = req.files.map(file => file.path);
        await product.save();
        res.status(201).send(responseCreator(201, product, 'Image added successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

const getProductById = async (req, res) => {
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
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        res.status(200).send(responseCreator(200, product, 'Product updated successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        res.status(200).send(responseCreator(200, product, 'Product deleted successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

const countProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if(!count) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, count, 'Products count successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}


const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({isFeatured: true}).populate('category').populate('seller');
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

const getDiscountedProducts = async (req, res) => {
    try {
        const products = await Product.find({discount: true}).populate('category').populate('seller');
        if(!products) {
            return res.status(404).send(responseCreator(404, null, 'No products found'));
        }
        res.status(200).send(responseCreator(200, products, 'Products found successfully'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

//delete image
const deleteImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).send(responseCreator(404, null, 'No product found'));
        }
        if(product.image.length === 0){
            return res.status(400).send(responseCreator(400, null, 'No image to delete'));
        }
        const image = product.image.find(image => image === req.params.image);
        if(!image) {
            return res.status(404).send(responseCreator(404, null, 'No image found'));
        }
        fs.unlink(path.join(__dirname, '..', '..', 'public/single', image), (err) => {
            if(err) {
                return res.status(500).send(responseCreator(500, null, err.message));
            }
            product.image.splice(product.image.indexOf(image), 1);
            product.save();
            res.status(200).send(responseCreator(200, product, 'Image deleted successfully'));
        });
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, countProducts, getFeaturedProducts, getDiscountedProducts, uploadImages };