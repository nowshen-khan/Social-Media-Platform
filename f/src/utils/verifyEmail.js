import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail", // আপনার ইমেইল সার্ভিস প্রোভাইডার
	auth: {
		user: process.env.EMAIL, // আপনার ইমেইল
		pass: process.env.EMAIL_PASSWORD, // ইমেইল পাসওয়ার্ড
	},
});

export const sendEmail = async (to, subject, text) => {
	await transporter.sendMail({
		from: process.env.EMAIL,
		to,
		subject,
		text,
	});
};
