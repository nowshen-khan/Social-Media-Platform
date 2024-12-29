const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();
const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());

// mongoose
// 	.connect(process.env.MONGO_URL)
// 	.then(() => console.log("MongoDB Connected"))
// 	.catch((err) => console.log("MongoDB Connection Error:", err));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", authRoute);
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
