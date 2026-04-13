import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Show from "./pages/Show";
import New from "./pages/New"
import Edit from "./pages/Edit"
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Index />} />
        <Route path="/listings/:id" element={<Show />} />
        <Route path="/listings/new" element={<New />} />
        <Route path="/listings/:id/edit" element={<Edit/>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;