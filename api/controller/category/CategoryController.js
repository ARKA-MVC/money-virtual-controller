const categoryService = require("../../service/category/CategoryService");
const categoryController = {};

categoryController.getAllCategories = (req, res) => {
  categoryService
    .getAllCategories()
    .then((results) => {
      res.status(200).json({
        data: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

categoryController.getSavingCategories = (req, res) => {
  categoryService
    .getSavingCategories()
    .then((results) => {
      res.status(200).json({
        data: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports = categoryController;
