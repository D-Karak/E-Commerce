import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../api/CategoryApi";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", img: "" });
  const { user } = useContext(AuthContext);
  const token = user.token;

  const fetchCategories = async () => {
    try {
      const data = await getCategories(token);
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOnchange = (e) => {
    setNewCategory({ name: e.target.value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (!newCategory.name.trim()) {
        return alert("Please enter a category name");
      }

      await createCategory(newCategory, token);
      setNewCategory({ name: "", img: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await deleteCategory(id, token);
        alert("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Categories</h1>

      {/* Add Category */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Category</h2>
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleOnchange}
          autoComplete="off"
          placeholder="Enter category name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((el) => (
          <div
            key={el._id}
            className="relative bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center justify-between"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-2">{el.name}</h2>
            <button
              onClick={() => handleDelete(el._id)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-red-100 transition"
            >
              <DeleteForeverOutlinedIcon color="error" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
