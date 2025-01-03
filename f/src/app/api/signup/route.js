import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();
		const { fullName, email, password, dob, gender } = body;
		if (!fullName || !email || !password || !dob || !gender) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}

		await dbConnect();
		// Check if user exists
		const existingUser = await User.findOne({ email });
		//console.log("Existing User:", existingUser);
		if (existingUser) {
			return NextResponse.json(
				{ message: "Email already registered" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const username = email.split("@")[0];
		//const username = fullName.split(" ")[0];
		const user = new User({
			fullName,
			email,
			password: hashedPassword,
			dob,
			gender,
			username,
		});

		const savedUser = await user.save();
		//console.log("Saved User:", savedUser);

		//console.log("User created:", body);
		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error during user creation:", error);
		return NextResponse.json(
			{ message: "Server error", error },
			{ status: 500 }
		);
	}
}
