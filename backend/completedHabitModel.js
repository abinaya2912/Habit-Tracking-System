const mongoose = require("mongoose");

const CompletedHabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  frequency: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  startDate: { type: Date, required: true },
  reminders: { type: String },
  completedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("CompletedHabit", CompletedHabitSchema);
