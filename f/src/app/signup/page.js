"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		dob: "",
		gender: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		//console.log("Signup Data:", formData);
		// API কল করুন
		try {
			// API Call
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			//console.log("Sending Data:", JSON.stringify(formData));

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Something went wrong!");
			}
			console.log("Success:", data);
			setSuccess("Signup successful!");
			setFormData({
				fullName: "",
				email: "",
				password: "",

				dob: "",
				gender: "",
			});

			// TODO: Redirect to login page
			router.push("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
					Join Us!
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && <p className="text-red-500">{error}</p>}
					{success && <p className="text-green-500">{success}</p>}
					<input
						type="text"
						name="fullName"
						placeholder="Full Name (e.g., John Doe)"
						value={formData.fullName}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
					/>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
						/>
						<button
							type="button"
							className="absolute top-2 right-2 text-gray-500"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
					<input
						type="date"
						name="dob"
						value={formData.dob}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-400"
					/>
					<div className="flex items-center gap-4 text-gray-500">
						Gender
						<label className="flex items-center ">
							<input
								type="radio"
								name="gender"
								value="Male"
								onChange={handleChange}
								className="mr-2 "
							/>
							Male
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								value="Female"
								onChange={handleChange}
								className="mr-2 text-gray-600"
							/>
							Female
						</label>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						{loading ? "Submitting..." : "Sign Up"}
					</button>
				</form>
				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Have an account?{" "}
					<Link
						href="/login"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
