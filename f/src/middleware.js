import { NextResponse } from "next/server";

export function middleware(req) {
	const token = req.cookies.get("authToken")?.value;
	const url = req.nextUrl.clone();

	if (token && (url.pathname === "/login" || url.pathname === "/signup")) {
		url.pathname = "/"; // Redirect to home page if already logged in
		return NextResponse.redirect(url);
	}

	// Authentication Middleware
	if (!token && url.pathname !== "/login" && url.pathname !== "/signup") {
		url.pathname = "/login";
		return NextResponse.redirect(url); // If no token, redirect to login
	}

	// CSP Middleware
	// const response = NextResponse.next(); // Continue with the request flow
	// response.headers.set(
	// 	"Content-Security-Policy",
	// 	"default-src 'self'; img-src https:; script-src 'self'; style-src 'self';"
	// );

	// return response;
	return NextResponse.next(); // Continue with the request flow
}

export const config = {
	matcher: ["/", "/login", "/signup"], // Specify paths where this middleware applies
};
