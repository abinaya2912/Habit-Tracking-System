// tracking.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from "../components/Navbar1";
import './activity.css';

const Tracking = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // Get user id from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`http://localhost:5000/habits?userId=${userData.id}`);
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  const handleDelete = async (id, habit) => {
    const userChoice = window.confirm("Is this habit completed?");
    
    if (userChoice) {
      try {
        await axios.post(`http://localhost:5000/habit/completed`, habit);
        alert("Habit moved to Completed Tasks!");
      } catch (error) {
        console.error("Error marking habit as completed:", error);
      }
    } else {
      try {
        await axios.post(`http://localhost:5000/habit/pending`, habit);
        alert("Habit moved to Pending Tasks!");
      } catch (error) {
        console.error("Error marking habit as pending:", error);
      }
    }

    try {
      await axios.delete(`http://localhost:5000/habit/${id}`);
      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="habit-tracker-page">
        <div className="intro-container">
          <h1>Habit Tracker</h1>
          <p>Track your habits efficiently. Add new habits, set goals, and maintain consistency for a healthier routine.</p>
        </div>

        <div className="buttons-container">
          <button className="add-habit-btn" onClick={() => navigate('/addhabits')}>
            + Add Habit
          </button>
        </div>

        <div className="habit-list">
          <h3>View Habits</h3>
          {habits.length === 0 ? (
            <p>No habits added.</p>
          ) : (
            <ul>
              {habits.map((habit, index) => (
                <li key={habit._id || index} className="habit-item">
                  <span>{habit.name} - {habit.frequency} ({habit.timeOfDay})</span>
                  <div className="habit-actions">
                    <button className="delete-btn" onClick={() => handleDelete(habit._id, habit)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
