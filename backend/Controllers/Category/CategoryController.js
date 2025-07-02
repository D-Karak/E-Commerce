const CategoryModel = require("../../Models/Category/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existingCategory = await CategoryModel.find({ name });
    if (existingCategory.length > 0) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new CategoryModel({ name });
    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
    }
    catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Server error" });
    }}



// This function retrieves all categories from the database
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
};

// This function updates a category in the database
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", category });
}
  
  catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }} ;


// This function deletes a category from the database
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};