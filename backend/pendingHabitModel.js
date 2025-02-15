const mongoose = require("mongoose");

const PendingHabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  frequency: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  startDate: { type: Date, required: true },
  reminders: { type: String },
  addedAt: { type: Date, default: Date.now }, // Stores the date when marked as pending
});

module.exports = mongoose.model("PendingHabit", PendingHabitSchema);