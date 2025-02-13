const mongoose = require('mongoose');
const Signupschema = new mongoose.Schema({ username: String, email: { type: String, unique: true }, password: String });
const signupmodel = mongoose.model("signup", Signupschema);
module.exports=signupmodel;
