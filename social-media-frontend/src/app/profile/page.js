"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem("token"); // টোকেন নিন
			if (!token) {
				setError("No token found");
				return;
			}

			try {
				const res = await axios.get("http://localhost:5000/api/user/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUser(res.data); // ডেটা সেট করুন
			} catch (err) {
				console.error(err);
				setError("Failed to fetch user data");
			}
		};

		fetchUserData();
	}, []);

	if (error) return <p>{error}</p>;
	if (!user) return <p>Loading...</p>;

	return (
		<div>
			<h1>Welcome, {user.username}</h1>
			<p>Email: {user.email}</p>
			<p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
		</div>
	);
};

export default Profile;
