const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/category/CategoryController.js');

categoryRouter.get('/getall', categoryController.getAllCategories);
categoryRouter.get('/getsaving', categoryController.getSavingCategories);

module.exports = categoryRouter;
