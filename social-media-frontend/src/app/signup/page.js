"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/signup",
				formData
			);
			setMessage(res.data.message);
			setMessage("Signup successful");
			router.push("/dashboard");
			setFormData({ username: "", email: "", password: "" });
		} catch (err) {
			setMessage(err.response?.data?.error || "Something went wrong");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-gray-200 p-8 rounded shadow-md w-96"
			>
				<h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
					className="block w-full p-2 mb-4 border rounded text-gray-500"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					className="block w-full p-2 mb-4 border rounded text-gray-500"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					className="block w-full p-2 mb-4 border rounded text-gray-500"
				/>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded"
				>
					Sign Up
				</button>
				{message && (
					<p className="mt-4 text-center text-green-600">{message}</p>
				)}
			</form>
		</div>
	);
};

export default SignUp;
