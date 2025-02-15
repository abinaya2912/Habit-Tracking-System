const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const signupmodel = require("./signup");
const Habit = require("./habitModel");
const CompletedHabit = require("./completedHabitModel");
const PendingHabit = require("./pendingHabitModel");

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

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      user: { id: user._id, name: user.username, email: user.email } // Include the name in response
    });
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

/* ✅ Fetch Completed Habits */
app.get("/habits/completed", async (req, res) => {
  try {
    const completedHabits = await CompletedHabit.find();
    res.status(200).json(completedHabits);
  } catch (error) {
    console.error("❌ Error fetching completed habits:", error);
    res.status(500).json({ message: "Error fetching completed habits" });
  }
});

/* ✅ Fetch Pending Habits */
app.get("/habits/pending", async (req, res) => {
  try {
    const pendingHabits = await PendingHabit.find();
    res.status(200).json(pendingHabits);
  } catch (error) {
    console.error("❌ Error fetching pending habits:", error);
    res.status(500).json({ message: "Error fetching pending habits" });
  }
});

/* ✅ Move Habit to Completed */
app.post("/habit/completed", async (req, res) => {
  try {
    const completedHabit = new CompletedHabit(req.body);
    await completedHabit.save();
    res.status(201).json({ message: "Habit moved to Completed Tasks", completedHabit });
  } catch (error) {
    console.error("❌ Error moving habit to completed:", error);
    res.status(500).json({ message: "Error saving habit" });
  }
});

/* ✅ Move Habit to Pending */
app.post("/habit/pending", async (req, res) => {
  try {
    const pendingHabit = new PendingHabit(req.body);
    await pendingHabit.save();
    res.status(201).json({ message: "Habit moved to Pending Tasks", pendingHabit });
  } catch (error) {
    console.error("❌ Error moving habit to pending:", error);
    res.status(500).json({ message: "Error saving habit" });
  }
});

/* ✅ Update Habit */
app.put("/habit/update/:id", async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHabit) return res.status(404).json({ message: "Habit not found" });

    res.status(200).json({ message: "Habit updated successfully", updatedHabit });
  } catch (error) {
    console.error("❌ Error updating habit:", error);
    res.status(500).json({ message: "Error updating habit" });
  }
});

/* ✅ Delete Habit */
app.delete("/habit/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Habit deleted" });
  } catch (error) {
    console.error("❌ Error deleting habit:", error);
    res.status(500).json({ message: "Error deleting habit" });
  }
});

/* ✅ Delete Completed Habit */
app.delete("/habit/completed/:id", async (req, res) => {
  try {
    await CompletedHabit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Completed habit deleted" });
  } catch (error) {
    console.error("❌ Error deleting completed habit:", error);
    res.status(500).json({ message: "Error deleting completed habit" });
  }
});

/* ✅ Delete Pending Habit */
app.delete("/habit/pending/:id", async (req, res) => {
  try {
    await PendingHabit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Pending habit deleted" });
  } catch (error) {
    console.error("❌ Error deleting pending habit:", error);
    res.status(500).json({ message: "Error deleting pending habit" });
  }
});

/* ✅ Reset Habits (Move All to Pending) */
app.post("/habit/reset", async (req, res) => {
  try {
    const completedHabits = await CompletedHabit.find();
    const movedHabits = completedHabits.map(habit => new PendingHabit(habit.toObject()));
    await PendingHabit.insertMany(movedHabits);
    await CompletedHabit.deleteMany({});
    res.status(200).json({ message: "All completed habits moved to pending" });
  } catch (error) {
    console.error("❌ Error resetting habits:", error);
    res.status(500).json({ message: "Error resetting habits" });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));