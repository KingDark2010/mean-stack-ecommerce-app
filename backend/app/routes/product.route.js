//require express router
const router = require('express').Router();
// require product model
const productController = require('../controllers/product.controller');
// reqire auth middleware
const auth = require('../middleware/auth');
// require uploader middleware
const uploader = require('../middleware/uploader');

// add product
router.post('/add', auth.AuthSeller, uploader.single('image'), productController.addProduct);

// get all products
router.get('/all', productController.getAllProducts);

// get product by id
router.get('/:id', productController.getProductById);


// update product
router.put('/update/:id', productController.updateProduct);


//delete product
router.delete('/delete/:id', productController.deleteProduct);

//count products
router.get('/count', productController.countProducts);

//get Featured products
router.get('/featured', productController.getFeaturedProducts);
//get discounted products
router.get('/discounted', productController.getDiscountedProducts);

module.exports = router;