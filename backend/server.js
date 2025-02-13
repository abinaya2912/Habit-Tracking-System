const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const signupmodel = require("./signup");
const Habit = require("./habitModel");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongourl = process.env.MONGO_URI || "mongodb://localhost:27017/habitTracker";
const port = process.env.PORT || 5000;

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Database connection error:", error));

/* ✅ Signup Route */
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await signupmodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new signupmodel({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ✅ Login Route */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupmodel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

/* ✅ Add New Habit */
app.post("/add-habit", async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json({ message: "Habit added successfully", habit });
  } catch (error) {
    console.error("❌ Error adding habit:", error);
    res.status(500).json({ message: "Error saving habit" });
  }
});

/* ✅ Fetch All Habits */
app.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (error) {
    console.error("❌ Error fetching habits:", error);
    res.status(500).json({ message: "Error fetching habits" });
  }
});

/* ✅ Delete Habit */
app.delete("/habit/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting habit:", error);
    res.status(500).json({ message: "Error deleting habit" });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
