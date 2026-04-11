import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Show from "./pages/Show";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/listings/:id" element={<Show />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;