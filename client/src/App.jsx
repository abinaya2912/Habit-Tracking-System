// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homee from "./pages/Homee";
import Home from "./pages/Home";
import Tracking from "./pages/Tracking";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Login from "./pages/Login";
import "./App.css";
import Signup from "./pages/Signup";
import Addhabit from "./pages/Addhabit";

const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Homee />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addhabits" element={<Addhabit />} />
      </Routes>
    </Router>
  );
};

export default App;
