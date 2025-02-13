import React, { useState } from 'react';
import Navbar1 from "../components/Navbar1";
import './activity.css';

const HabitTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState({
    id: null, 
    name: '', 
    goal: 1, 
    frequency: 'Daily', 
    timeOfDay: 'Any Time', 
    startDate: '', 
    reminders: '' 
  });

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (habit.name.trim() === '') return;
    if (habit.id !== null) {
      setHabits(habits.map(h => (h.id === habit.id ? habit : h)));
    } else {
      setHabits([...habits, { ...habit, id: Date.now() }]);
    }
    setHabit({ id: null, name: '', goal: 1, frequency: 'Daily', timeOfDay: 'Any Time', startDate: '', reminders: '' });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const editHabit = habits.find(h => h.id === id);
    setHabit(editHabit);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div>
      <Navbar1 />
      <div className="habit-tracker">
        {/* Intro Section */}
        <div className="intro-container">
          <h1>Habit Tracker</h1>
          <p>Track your habits efficiently. Add new habits, set goals, and maintain consistency for a healthier routine.</p>
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          <button className="add-habit-btn" onClick={() => setShowForm(true)}>+ Add Habit</button>
        </div>

        {/* Habit Form */}
        {showForm && (
          <div className="habit-form">
            <h2>{habit.id !== null ? 'Edit Habit' : 'New Habit'}</h2>
            <label>Name:
              <input type="text" name="name" value={habit.name} onChange={handleChange} required />
            </label>
            <label>Goal:
              <input type="number" name="goal" value={habit.goal} onChange={handleChange} min="1" />
            </label>
            <label>Repeat:
              <select name="frequency" value={habit.frequency} onChange={handleChange}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </label>
            <label>Time of Day:
              <select name="timeOfDay" value={habit.timeOfDay} onChange={handleChange}>
                <option>Any Time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <label>Start Date:
              <input type="date" name="startDate" value={habit.startDate} onChange={handleChange} />
            </label>
            <label>Reminders:
              <input type="text" name="reminders" value={habit.reminders} onChange={handleChange} placeholder="Optional" />
            </label>
            <div className="form-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>{habit.id !== null ? 'Update' : 'Save'}</button>
            </div>
          </div>
        )}

        {/* Habit List */}
        <div className="habit-list">
          <h3>View Habits</h3>
          {habits.length === 0 ? <p>No habits added.</p> : (
            <ul>
              {habits.map(h => (
                <li key={h.id} className="habit-item">
                  <span>{h.name} - {h.frequency} ({h.timeOfDay})</span>
                  <div className="habit-actions">
                    <button className="edit-btn" onClick={() => handleEdit(h.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(h.id)}>Delete</button>
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

export default HabitTracker;
