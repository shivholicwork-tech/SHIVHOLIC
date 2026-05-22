import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // For demo mode: allow access without authentication
  // In production, uncomment the block below to enforce auth
  // const protectedPaths = ["/dashboard", "/chat", "/audit", "/keywords", "/content", "/topical-maps", "/rank-tracker", "/backlinks", "/technical-seo", "/settings", "/billing"];
  // const isProtected = protectedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));
  // const token = request.cookies.get("auth-token")?.value;
  // if (isProtected && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
