"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");
	const [token, setToken] = useState("");
	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/login",
				formData
			);

			if (res.data.token) {
				console.log("Token from Response:", res.data.token);
				setToken(res.data.token);
				localStorage.setItem("token", res.data.token);
				setMessage("Login successful");

				setTimeout(() => {
					setMessage("Redirecting to dashboard...");
					router.push("/dashboard");
				}, 100);
			}

			setFormData({ email: "", password: "" });
		} catch (err) {
			setMessage(err.response?.data?.message || "Something went wrong");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-gray-200 p-8 rounded shadow-md w-96"
			>
				<h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
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
					Login
				</button>
				{message && (
					<p className="mt-4 text-center text-green-600">{message}</p>
				)}
				{token && (
					<p className="mt-4 text-center text-gray-600">{console.log(token)}</p>
				)}
			</form>
		</div>
	);
};

export default Login;
