// NextAuth.js configuration with Credentials provider
// In production, this connects to the NestJS backend for authentication

import { NextResponse } from "next/server";

// Simplified auth handler for demo purposes
// Replace with full NextAuth when next-auth is added as dependency
export async function GET() {
  return NextResponse.json({
    message: "Auth endpoint ready. Using client-side auth with Zustand for demo.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Mock authentication - in production, forward to NestJS backend
    if (body.email && body.password) {
      return NextResponse.json({
        user: {
          id: "user-1",
          email: body.email,
          name: body.email.split("@")[0],
        },
        access_token: "mock-jwt-token-" + Date.now(),
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
