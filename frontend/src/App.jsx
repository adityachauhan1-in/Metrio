import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Admin from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import UserDashBoard from "./pages/UserDashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/user" 
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}