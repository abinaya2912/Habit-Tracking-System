// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tracking from "./pages/Tracking";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Authform from "./pages/Authform";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/authform" element={<Authform />} />
      </Routes>
    </Router>
  );
};

export default App;
