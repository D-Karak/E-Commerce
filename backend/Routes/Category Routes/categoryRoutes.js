const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
  } = require("../../Controllers/Category/CategoryController");

const express = require("express");
const router=express.Router();
const { authenticateUser, authorizeRoles } = require("../../Middleware/authMiddleware");

// Route to create a new category
router.post("/create", authenticateUser, authorizeRoles("Admin"), createCategory);
// Route to get all categories
router.get("/", authenticateUser, authorizeRoles("Admin"), getAllCategories);
// Route to update a category by ID
router.put("/update/:id", authenticateUser, authorizeRoles("Admin"), updateCategory);
// Route to delete a category by ID
router.delete("/delete/:id", authenticateUser, authorizeRoles("Admin"), deleteCategory);    

module.exports = router;