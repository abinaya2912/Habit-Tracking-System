const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const signupmodel = require("./signup");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongourl = process.env.MONGO_URI || "mongodb://localhost:27017/signup";
const port = process.env.PORT || 5000;

mongoose.connect(mongourl)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error connecting to database:", error));

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await signupmodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const signup = new signupmodel({ username, email, password: hashedPassword });
    await signup.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupmodel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
