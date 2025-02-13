import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Home.css";
import Navbar1 from "../components/Navbar1";

const Homee = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
    <Navbar1/>
    <div className="home-container">
      <div className="text-section">
        <h1>Habits Tracker</h1>
        <p>Track your habits effortlessly and build a better lifestyle.</p>
        <ul className="benefits-list">
          <li>✅ Set daily, weekly, and monthly goals</li>
          <li>✅ Receive smart reminders</li>
          <li>✅ View progress reports with insights</li>
          <li>✅ Stay motivated with streaks and rewards</li>
        </ul>
        <button className="cta-button" onClick={() => navigate("/tracking")}>
          Get Started
        </button>
      </div>
      <div className="image-section">
        <img src="https://thumbs.dreamstime.com/b/top-view-flat-lay-habit-tracker-book-pen-cup-black-coffee-succulent-plant-pot-blue-background-copy-space-206715044.jpg"
          alt="Habit Tracking"
        />
      </div>

    </div>
    </>
  
  );
};

export default Homee;
