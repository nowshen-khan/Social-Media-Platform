import bcrypt from "bcrypt";

export async function POST(req) {
	const { token, newPassword } = await req.json();

	// টোকেন যাচাই
	const user = await findUserByResetToken(token);
	if (!user) return new Response("Invalid or expired token", { status: 400 });

	// পাসওয়ার্ড আপডেট
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	await updateUserPassword(user.id, hashedPassword);

	return new Response("Password updated successfully", { status: 200 });
}
