import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Layout Components
import Dashboard from './components/layout/Dashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Private Route
import PrivateRoute from './components/PrivateRoute';

// Book Components
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm'; // ✅ new import

// Placeholder Components
const BorrowList = () => <div className="p-8">Borrow List - Coming Soon</div>;
import CategoryList from './components/categories/CategoryList';
import CategoryForm from './components/categories/CategoryForm';
import BookSearch from './components/books/BookSearch';
import UserList from './components/users/UserList'
import BookDetail from './components/books/BookDetail';
import FinePayment from './components/layout/pages/FinePayment';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            }
          />

          <Route
            path="/books/search"
            element={
              <PrivateRoute>
                <BookSearch />
              </PrivateRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />

          {/* ✅ Add route for creating a new book */}
          <Route
            path="/books/new"
            element={
              <PrivateRoute librarianAllowed>
                <BookForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/borrows"
            element={
              <PrivateRoute>
                <BorrowList />
              </PrivateRoute>
            }
          />

          {/* ✅ Categories */}
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/new"
            element={
              <PrivateRoute librarianAllowed>
                <CategoryForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/fines"
            element={
              <PrivateRoute librarianAllowed>
                <FinePayment />
              </PrivateRoute>
            }
          />

          {/* Admin Only Route */}
          <Route
            path="/users"
            element={
              <PrivateRoute adminOnly>
                <UserList />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
