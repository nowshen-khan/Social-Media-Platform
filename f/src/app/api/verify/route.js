import jwt from "jsonwebtoken";

export async function POST(request) {
	try {
		const { token } = await request.json();

		const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace 'secret' with your secure key
		return new Response(JSON.stringify({ valid: true, decoded }), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ valid: false, error: error.message }),
			{ status: 401 }
		);
	}
}
