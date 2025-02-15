import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import "./activity.css";

const Tracking = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`https://habit-tracking-system-backend.onrender.com/habits?userId=${userData.id}`);
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  const handleDeleteClick = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  const handleDeleteConfirm = async (isCompleted) => {
    if (!selectedHabit) return;

    try {
      if (isCompleted) {
        await axios.post(`https://habit-tracking-system-backend.onrender.com/habit/completed`, selectedHabit);
        alert("Habit marked as Completed!");
      } else {
        await axios.post(`https://habit-tracking-system-backend.onrender.com/habit/pending`, selectedHabit);
        alert("Habit marked as Not Completed!");
      }

      await axios.delete(`https://habit-tracking-system-backend.onrender.com/habit/${selectedHabit._id}`);
      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== selectedHabit._id));
    } catch (error) {
      console.error("Error handling habit:", error);
    }

    setShowModal(false);
    setSelectedHabit(null);
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
          <button className="add-habit-btn" onClick={() => navigate("/addhabits")}>
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
                  <span>
                    {habit.name} - {habit.frequency} ({habit.timeOfDay})
                  </span>
                  <div className="habit-actions">
                    <button className="delete-btn" onClick={() => handleDeleteClick(habit)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Is this habit completed?</h3>
              <div className="modal-buttons">
                <button className="yes-btn" onClick={() => handleDeleteConfirm(true)}>Yes</button>
                <button className="no-btn" onClick={() => handleDeleteConfirm(false)}>No</button>
        
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
