const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct,delProduct} = require('../../Controllers/productController');   
const { authenticateUser,authorizeRoles } = require('../../Middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllProducts); // any users can view products 

router.get('/:id', getProductById); // any users can view a product by ID

router.post('/create', authenticateUser, authorizeRoles('Admin','Seller'), createProduct); // Only Admin and Seller can create products

router.put('/update/:id', authenticateUser, authorizeRoles('Admin','Seller'), updateProduct); // Only Admin and Seller can update products

router.delete('/delete/:id', authenticateUser, authorizeRoles('Admin','Seller'), delProduct); // Only Admin and Seller can delete products


module.exports = router;