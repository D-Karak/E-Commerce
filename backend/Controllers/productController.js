const ProductModel = require("../Models/Product/ProductModel");
const Review = require("../Models/Reviews/ReviewSchema");
// This function creates a new product in the database
const createProduct = async (req, res) => {
  try {
    const { name, description,image, price, category, stock } = req.body;
    const product = new ProductModel({
      name,
      description,
      image,
      price,
      category,
      stock,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// This function retrieves all products from the database
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const category = req.query.category;

    const skip = (page - 1) * limit;

    const filter = category && category !== 'all' ? { category } : {};

    const [products, totalCount] = await Promise.all([
      ProductModel.find(filter).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter),
    ]);

    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ productId: product._id });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        return {
          ...product,
          avgRating: Number(avgRating.toFixed(1)),
          reviewCount: reviews.length,
        };
      })
    );

    res.status(200).json({
      message: "Products retrieved successfully",
      products: productsWithRatings,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });

  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message || error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
      const { id } = req.params;
      const product = await ProductModel.findOne({ _id: id });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
          res.status(200).json({ message: 'Product retrieved successfully', product }); 
      }catch (error) {  
          res.status(500).json({ message: 'Error retrieving product', error });
      }
    }

// This function updates a product in the database
const updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, description, price, category, stock } = req.body;
      const product = await ProductModel.findByIdAndUpdate(id, {
          name,
          description,
          price,
          category,
          stock,
      }, { new: true });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
  }
}

// This function deletes a product from the database
const delProduct= async (req, res) => {
  try {
      const { id } = req.params;
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
  }
}
module.exports = { createProduct, getAllProducts, getProductById, updateProduct, delProduct };
