import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req) {
	const { email } = await req.json();

	// ইউজার ইমেইল যাচাই করুন
	const user = await findUserByEmail(email); // ডাটাবেজ থেকে ইউজার খুঁজুন
	if (!user) return new Response("User not found", { status: 404 });

	// টোকেন তৈরি
	const token = crypto.randomBytes(32).toString("hex");
	const resetURL = `${process.env.BASE_URL}/reset-password/${token}`;

	// টোকেন ডাটাবেজে সংরক্ষণ
	await saveResetToken(user.id, token);

	// ইমেইল পাঠান
	await sendEmail(
		email,
		"Password Reset",
		`Reset your password here: ${resetURL}`
	);

	return new Response("Password reset email sent", { status: 200 });
}
