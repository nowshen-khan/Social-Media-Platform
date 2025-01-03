import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	dob: { type: Date, required: true },
	gender: { type: String, enum: ["Male", "Female", "other"], required: true },
	username: { type: String, unique: true, default: null },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
