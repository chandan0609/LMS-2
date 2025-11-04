import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookDetail } from "../../redux/slices/bookDetailSlice";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { book, loading, error } = useSelector((state) => state.bookDetail);

  useEffect(() => {
    dispatch(fetchBookDetail(id));
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center mt-10">Loading book details...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-4 text-blue-700">{book.title}</h2>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Category:</strong> {book.category_name || book.category}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>ISBN:</strong> {book.ISBN || "N/A"}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Status:</strong> {book.status || "N/A"}
      </p>
      <p className="text-gray-600 mt-4">
        {book.description || "No description available."}
      </p>
    </div>
  );
};

export default BookDetail;
