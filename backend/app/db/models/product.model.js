// require mongoose
const mongoose = require('mongoose');

// define schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    descriptionLite: {
        type: String,
        required: true,
        trim: true
    },
    // main disciption
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    //images is a array of images
    images: [{
        type: String,
        trim: true
    }],
    //category is a array of category
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    //brand
    brand: {
        type: String,
        required: true,
        trim: true
    },
    // seller
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //count in stock
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    // rating
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    //number of reviews
    numberOfReviews: {
        type: Number,
        min: 0,
        default: 0
    },
    // is featured
    isFeatured: {
        type: Boolean,
        required: true
    },
    // have disscount
    haveDiscount: {
        type: Boolean,
        default: false
    },
    //discount
    discount: {
        type: Number,
        min: 0
    },
    //tags is a array of tags
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    //created_at is the time when the product is created
    created_at: {
        type: Date,
        default: Date.now
    },
    //updated_at is the time when the product is updated
    updated_at: {
        type: Date,
        default: Date.now
    }

});

// make model and export
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
