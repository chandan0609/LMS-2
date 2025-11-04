import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, searchBooks } from "../../redux/slices/bookSlice";

const BookSearch = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  // ✅ State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");

  // ✅ Debounced search (500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(searchBooks(searchTerm));
      } else {
        dispatch(searchBooks()); // fetch all if empty
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchField, dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
         Book Search
      </h2>

      {/* Search Input & Dropdown */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-3">
        {/* Category Dropdown */}
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
          <option value="isbn">ISBN</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center mt-10">Searching books...</p>}
      {error && (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      )}

      {/* Search Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {books && books.length > 0
          ? books.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Author: {book.author}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {book.category || "N/A"}
                </p>
                <p className="text-sm text-gray-500">ISBN: {book.ISBN}</p>
              </div>
            ))
          : !loading && (
              <p className="text-center text-gray-600 col-span-3">
                No books found.
              </p>
            )}
      </div>
    </div>
  );
};

export default BookSearch;
