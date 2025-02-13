const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  goal: Number,
  frequency: String,
  timeOfDay: String,
  startDate: String,
  reminders: String,
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
