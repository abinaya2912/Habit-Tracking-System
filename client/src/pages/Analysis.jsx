import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Analysis = () => {
  const [habitData, setHabitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completedRes = await axios.get("http://localhost:5000/habits/completed");
        const pendingRes = await axios.get("http://localhost:5000/habits/pending");

        const completedData = calculateTaskDistribution(completedRes.data, "Completed");
        const pendingData = calculateTaskDistribution(pendingRes.data, "Pending");

        setHabitData([...completedData, ...pendingData]);
      } catch (error) {
        console.error("Error fetching habit data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTaskDistribution = useCallback((habits, status) => {
    const taskCounts = { daily: 0, weekly: 0, monthly: 0 };

    habits.forEach((habit) => {
      if (habit.frequency === "daily") taskCounts.daily++;
      else if (habit.frequency === "weekly") taskCounts.weekly++;
      else if (habit.frequency === "monthly") taskCounts.monthly++;
    });

    return Object.keys(taskCounts).map((key, index) => ({
      name: `${status} - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
      value: taskCounts[key],
      color: COLORS[index],
    }));
  }, []);

  return (
    <div>
      <h2>Habit Analysis</h2>
      <PieChart width={400} height={400}>
        <Pie data={habitData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
          {habitData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Analysis;
