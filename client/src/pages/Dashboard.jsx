import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from "../components/Navbar1";

const Dashboard = () => {
  const [completedHabits, setCompletedHabits] = useState([]);
  const [pendingHabits, setPendingHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("http://localhost:5000/habits");
        const completed = response.data.filter(habit => habit.status === "completed");
        const pending = response.data.filter(habit => habit.status === "pending");
        setCompletedHabits(completed);
        setPendingHabits(pending);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div>
      <Navbar1 />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="habit-section">
          <h2>Completed Habits</h2>
          <ul>
            {completedHabits.length === 0 ? <p>No completed habits.</p> : completedHabits.map(habit => <li key={habit._id}>{habit.name}</li>)}
          </ul>
        </div>
        <div className="habit-section">
          <h2>Pending Habits</h2>
          <ul>
            {pendingHabits.length === 0 ? <p>No pending habits.</p> : pendingHabits.map(habit => <li key={habit._id}>{habit.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
