// Auth API route that proxies credential validation to the NestJS backend

import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function GET() {
  return NextResponse.json({
    message: "Auth endpoint ready. Proxies to backend API for authentication.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...credentials } = body;

    const endpoint = action === "register" ? "/auth/register" : "/auth/login";

    const backendResponse = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || "Authentication failed" },
        { status: backendResponse.status }
      );
    }

    // Backend wraps in { success, data, error } envelope
    const payload = data.data || data;

    return NextResponse.json({
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    });
  } catch {
    // If backend is unreachable, return a clear error
    return NextResponse.json(
      { error: "Backend service unavailable. Please ensure the API is running." },
      { status: 503 }
    );
  }
}
