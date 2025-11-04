import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get("/categories/");
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await apiClient.delete(`/categories/${id}/`);
        setCategories((prev) =>
          prev.filter((cat) => cat._id !== id && cat.id !== id)
        );
      } catch (err) {
        setError(err.message || "Failed to delete category");
      }
    }
  };
  const handleAddCategory = () => {
    navigate("/categories/new");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Book Categories</h2>
        <PrivateRoute librarianAllowed>
          <button
            onClick={handleAddCategory}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Add Category
          </button>
        </PrivateRoute>

        {loading && <p>Loading categories...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && categories.length === 0 && <p>No categories found.</p>}

        {!loading && categories.length > 0 && (
          <table className="category-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id || cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description || "—"}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(cat._id || cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
