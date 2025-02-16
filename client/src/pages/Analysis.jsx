// Analysis.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import "./Analysis.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Analysis = () => {
  const [completedData, setCompletedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the logged-in user's id from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData ? userData.id : "";

        // Fetch completed and pending habits for the specific user
        const completedRes = await axios.get(
          `https://habit-tracking-system-proj.onrender.com/habits/completed?userId=${userId}`
        );
        const pendingRes = await axios.get(
          `https://habit-tracking-system-proj.onrender.com/habits/pending?userId=${userId}`
        );

        // Calculate the distribution for each status
        setCompletedData(calculateTaskDistribution(completedRes.data));
        setPendingData(calculateTaskDistribution(pendingRes.data));
      } catch (error) {
        console.error("Error fetching habit data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate distribution based on frequency for a list of habits
  const calculateTaskDistribution = (habits) => {
    const taskCounts = { daily: 0, weekly: 0, monthly: 0 };

    habits.forEach((habit) => {
      const freq = habit.frequency.toLowerCase();
      if (freq === "daily") taskCounts.daily++;
      else if (freq === "weekly") taskCounts.weekly++;
      else if (freq === "monthly") taskCounts.monthly++;
    });

    return [
      { name: "Daily", value: taskCounts.daily },
      { name: "Weekly", value: taskCounts.weekly },
      { name: "Monthly", value: taskCounts.monthly }
    ];
  };

  // Custom label renderer to display percentages
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Navbar1 />
      <div className="analysis-page">
      <h2>Habit Analysis</h2>
        <div className="analysis-container">
          {/* Completed Habits Pie Chart */}
          <div className="chart-container">
            <h2>Completed Habits Analysis</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={completedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={renderCustomizedLabel}
              >
                {completedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Pending Habits Pie Chart */}
          <div className="chart-container">
            <h2>Pending Habits Analysis</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={pendingData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={renderCustomizedLabel}
              >
                {pendingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
