import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addhabits.css';

const AddHabit = () => {
  const navigate = useNavigate();
  const [habit, setHabit] = useState({
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

  const handleSave = async () => {
    if (!habit.name.trim()) return;

    try {
      await axios.post("http://localhost:5000/add-habit", habit);
      navigate('/tracking');
    } catch (error) {
      console.error("Error saving habit:", error);
    }
  };

  return (
    <div className="habit-form-container">
      <h2>New Habit</h2>
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
        <button className="cancel-btn" onClick={() => navigate('/tracking')}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddHabit;