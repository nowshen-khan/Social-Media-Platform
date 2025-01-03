const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
	const { fullName, email, password, dob, gender } = req.body;
	//const username = email.split("@")[0];
	const username = fullName.split(" ")[0];

	// Validation
	if (!fullName || !email || !password || !dob || !gender) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		// Check if user exists
		const existingUser = await User.findOne({ email });
		console.log("Existing User:", existingUser);
		if (existingUser) {
			return res.status(400).json({ message: "Email already registered" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = new User({
			fullName,
			email,
			password: hashedPassword,
			dob,
			gender,
			username,
		});

		const savedUser = await user.save();
		console.log("Saved User:", savedUser);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error during user creation:", error);
		res.status(500).json({ message: "Server error", error });
	}
};
