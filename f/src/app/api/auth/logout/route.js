export async function POST() {
	return new Response("Logout successful", {
		status: 200,
		headers: {
			"Set-Cookie": "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
		},
	});
}
