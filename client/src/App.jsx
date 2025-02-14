import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Homee from "./pages/Homee";
import Tracking from "./pages/Tracking";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Addhabit from "./pages/Addhabit";
import { auth, provider } from "./pages/Firebase"; // Removed unnecessary `Firebase` import
import "./App.css";

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
