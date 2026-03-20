import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import VerificationCode from "@/models/VerificationCode";

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

		const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit code

		await VerificationCode.updateOne({ email }, { code }, { upsert: true }); // Update or create the verification code

		// Send verification email
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: "Email Verification",
			text: `Your verification code is: ${code}`,
		});

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
