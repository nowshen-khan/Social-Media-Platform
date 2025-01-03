const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000", // React অ্যাপের URL
		methods: ["POST", "GET", "PUT", "DELETE"],
		credentials: true,
	})
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((error) => console.log("MongoDB connection error:", error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
