const mongoose = require("mongoose");

const CompletedHabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  frequency: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  startDate: { type: Date, required: true },
  reminders: { type: String },
  completedAt: { type: Date, default: Date.now }, // Stores the date of completion
});

module.exports = mongoose.model("CompletedHabit", CompletedHabitSchema);
