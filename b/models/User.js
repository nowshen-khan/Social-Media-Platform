const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		dob: { type: Date, required: true },
		gender: { type: String, enum: ["Male", "Female"], required: true },
		username: { type: String, unique: true, default: null }, // Unique username field
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
