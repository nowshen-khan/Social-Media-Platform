import { NextResponse } from "next/server";

export function middleware(req) {
	const token = req.cookies.get("authToken")?.value;
	const url = req.nextUrl.clone();

	// Authentication Middleware
	if (!token) {
		if (url.pathname !== "/login") {
			url.pathname = "/login";
			return NextResponse.redirect(url); // If no token, redirect to login
		}
	}

	// CSP Middleware
	const response = NextResponse.next(); // Continue with the request flow
	response.headers.set(
		"Content-Security-Policy",
		"default-src 'self'; img-src https:; script-src 'self'; style-src 'self';"
	);

	return response;
}

export const config = {
	matcher: ["/news-feed", "/profile", "/settings", "/"], // Specify paths where this middleware applies
};
