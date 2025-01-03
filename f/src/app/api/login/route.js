import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(request) {
	await dbConnect();
	const { email, password } = await request.json();

	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not found");
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}
		const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});
		jwt.verify(token, process.env.SECRET_KEY);
		return new Response(JSON.stringify({ token }), { status: 200 });
	} catch (error) {
		return new Response(error.message, { status: 401 });
	}

	// if (email === "a@a.a" && password === "password") {
	// 	const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
	// 	jwt.verify(token, "secret");
	// 	return new Response(JSON.stringify({ token }), { status: 200 });
	// }
	// return new Response("Unauthorized", { status: 401 });
}
