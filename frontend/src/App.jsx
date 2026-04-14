import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Show from "./pages/Show";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Index />} />
        <Route path="/listings/:id" element={<Show />} />
        <Route
          path="/listings/new"
          element={
            <ProtectedRoute>
              <New />
            </ProtectedRoute>
          }
        />
        <Route path="/listings/:id/edit" element={<Edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
