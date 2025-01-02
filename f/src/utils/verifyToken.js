const verifyToken = async (token) => {
	try {
		const res = await fetch("/api/verify", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});

		const data = await res.json();
		if (data.valid) {
			console.log("Token is valid:", data.decoded);
			return true; // টোকেন বৈধ হলে `true` রিটার্ন
		} else {
			console.error("Invalid token:", data.error);
			return false; // টোকেন অবৈধ হলে `false` রিটার্ন
		}
	} catch (error) {
		console.error("Error verifying token:", error);
		return false;
	}
};

export default verifyToken;
