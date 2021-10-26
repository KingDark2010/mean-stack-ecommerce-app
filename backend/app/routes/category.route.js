// require express router module
const router = require('express').Router();
//require category model
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth');
// add category
router.post('/add', categoryController.addCategory);

//delete category
router.delete('/delete/:id', categoryController.deleteCategory);

// get all categories
router.get('/' ,categoryController.getAllCategories);


// get single category
router.get('/:id', categoryController.getCategoryById);

// update category
router.put('/update/:id', categoryController.updateCategory);


// export category router
module.exports = router;