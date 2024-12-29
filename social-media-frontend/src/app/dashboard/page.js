"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
	const [message, setMessage] = useState("");
	const router = useRouter();

	useEffect(() => {
		const fetchDashboard = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				router.push("/login"); // Redirect to login if no token
				return;
			}

			try {
				const res = await axios.get("http://localhost:5000/api/dashboard", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setMessage(res.data.message);
			} catch (err) {
				//localStorage.removeItem("token"); // Clear invalid token
				//router.push("/login");
			}
		};

		fetchDashboard();
	}, [router]);

	return (
		<div className="flex items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">{message || "Loading..."}</h1>
		</div>
	);
};

export default Dashboard;
