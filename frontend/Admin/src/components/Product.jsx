import React, { useState, useContext, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/ProductApi";
import { getCategories } from "../api/CategoryApi";
import { AuthContext } from "../context/authContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Tooltip } from "@mui/material";

export default function Product() {
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const { user } = useContext(AuthContext);
  const token = user.token;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    price: "",
    stock: "",
  });

  const fetchCategories = async () => {
    try {
      const data = await getCategories(token);
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts(token);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditProductId(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const data = await updateProduct(editProductId, formData, token);
        alert(data.message);
      } else {
        const data = await createProduct(formData, token);
        alert(data.message);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const data = await deleteProduct(id, token);
      alert(data.message);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>

      {/* Product Form */}
      <div className="bg-white shadow rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="h-32 w-full object-contain border rounded"
            />
          )}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          >
            <option value="" disabled hidden>Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex gap-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-100 rounded"
              required
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              placeholder="Stock"
              onChange={handleChange}
              className="w-1/2 p-2 bg-gray-100 rounded"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update Product" : "Create Product"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Product List</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{prod.name}</td>
                    <td className="p-3">{prod.category}</td>
                    <td className="p-3">₹{prod.price}</td>
                    <td className="p-3">{prod.stock}</td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      <Tooltip title="Edit" arrow>
                        <button onClick={() => handleEdit(prod)}>
                          <EditOutlinedIcon className="text-blue-600 hover:text-blue-800" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <button onClick={() => handleDelete(prod._id)}>
                          <DeleteForeverOutlinedIcon className="text-red-600 hover:text-red-800" />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
