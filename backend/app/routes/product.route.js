//require express router
const router = require('express').Router();
// require product model
const productController = require('../controllers/product.controller');
// reqire auth middleware
const auth = require('../middleware/auth');
// require uploader middleware
const uploader = require('../middleware/uploader');

// add product
router.post('/add', auth.AuthAdmin, uploader.single('image'), productController.addProduct);

// get all products
router.get('/', auth.AuthAdmin, productController.getAllProducts);

// get product by id
router.get('/:id', productController.getProductById);


// update product
router.put('/update/:id', uploader.single('image'), productController.updateProduct);


//delete product
router.delete('/delete/:id', productController.deleteProduct);

//count products
router.get('/count', productController.countProducts);

//get Featured products
router.get('/featured', productController.getFeaturedProducts);
//get discounted products
router.get('/discounted', productController.getDiscountedProducts);

//add upload galary route
router.post('/upload/:id', auth.AuthSeller, uploader.array('images', 5), productController.uploadImages);


module.exports = router;