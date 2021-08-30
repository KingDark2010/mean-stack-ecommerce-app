const Category = require('../db/models/category.model');
const responseCreator = require('../helpers/response.helper')

const addCategory = async (req, res) => {
    // create new category
    const category = new Category(req.body);
    // check if category is saved
    try {
        const newCategory = await category.save();
        // check if no category is saved
        if (!newCategory) {
            return res.status(400).send(responseCreator(400, null, 'Category not saved'));
        }
        // return saved category
        res.status(201).send(responseCreator(201, newCategory, 'Category added successfully'));
    }
    catch (err) {
        // return error
        res.status(400).send(responseCreator(400, null, err.message));
    }
}

const deleteCategory = async (req, res) => {
    // get category id
    const id = req.params.id;
    // check if category id is valid
    try{
        // get category
        const category = await Category.findById(id);
        // check if category is not found
        if (!category) {
            return res.status(404).send(responseCreator(404, null, 'Category not found'));
        }
        // delete category
        const deletedCategory = await category.remove();
        // check if category is not deleted
        if (!deletedCategory) {
            return res.status(400).send(responseCreator(400, null, 'Category not deleted'));
        }
        // return deleted category
        res.status(200).send(responseCreator(200, deletedCategory, 'Category deleted successfully'));
    }
    catch (err) {
        // return error
        res.status(400).send(responseCreator(400, null, err.message));
    }
}

const getAllCategories = async (req, res) => {
    // get all categories
    try {
        const categories = await Category.find();
        // check if no categories are found
        if (!categories) {
            return res.status(404).send(responseCreator(404, null, 'No categories found'));
        }
        // return all categories
        res.status(200).send(responseCreator(200, categories, 'Categories found successfully'));
    }
    catch (err) {
        // return error
        res.status(400).send(responseCreator(400, null, err.message));
    }
}

const getCategoryById = async (req, res) => {
    // get category id
    const id = req.params.id;
    // check if category id is valid
    try {
        // get category
        const category = await Category.findById(id);
        // check if category is not found
        if (!category) {
            return res.status(404).send(responseCreator(404, null, 'Category not found'));
        }
        // return category
        res.status(200).send(responseCreator(200, category, 'Category found successfully'));
    }
    catch (err) {
        // return error
        res.status(400).send(responseCreator(400, null, err.message));
    }
}

const updateCategory = async (req, res) => {
    // get category id
    const id = req.params.id;
    // check if category id is valid
    try {
        // get category
        const category = await Category.findById(id);
        // check if category is not found
        if (!category) {
            return res.status(404).send(responseCreator(404, null, 'Category not found'));
        }
        // update category
        const updatedCategory = await category.updateOne(req.body);
        // check if category is not updated
        if (!updatedCategory) {
            return res.status(400).send(responseCreator(400, null, 'Category not updated'));
        }
        // return updated category
        res.status(200).send(responseCreator(200, updatedCategory, 'Category updated successfully'));
    }
    catch (err) {
        // return error
        res.status(400).send(responseCreator(400, null, err.message));
    }
}



module.exports = {addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory};