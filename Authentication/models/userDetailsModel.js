const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tedXID: { type: String,required:true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
