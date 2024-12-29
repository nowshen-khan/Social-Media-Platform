const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Signup
router.post("/signup", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(201).json("User created successfully");
	} catch (err) {
		res.status(500).json(err.message);
	}
});

// Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json("User not found");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json("Invalid password");
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Verify token
router.get("/dashboard", verifyToken, async (req, res) => {
	res.status(200).json({ message: `Welcome, ${req.user.username}!` });
});

// me
router.get("/me", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res.status(404).json("User not found");
		}
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
