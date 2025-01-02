import jwt from "jsonwebtoken";

export async function POST(request) {
	const { email, password } = await request.json();

	if (email === "a@a.a" && password === "password") {
		const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
		jwt.verify(token, "secret");
		return new Response(JSON.stringify({ token }), { status: 200 });
	}
	return new Response("Unauthorized", { status: 401 });
}
