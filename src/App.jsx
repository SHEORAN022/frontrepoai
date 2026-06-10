
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import Generate from './pages/Generate';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        {/* <Route path="/generate" element={<PrivateRoute><Generate /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;