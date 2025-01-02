"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function LogoutButton({ className }) {
	const router = useRouter();
	const { logout } = useAuthStore();

	const handleLogout = async () => {
		await fetch("/api/logout", { method: "POST" });
		document.cookie =
			"authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		logout();
		router.push("/login");
	};

	return (
		<button onClick={handleLogout} className={className}>
			Logout
		</button>
	);
}
