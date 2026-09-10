import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCSPPolicy, generateNonce } from "@/lib/csp";
import { SECURITY } from "@/lib/constants";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 120;
const rateStore = new Map<string, { count: number; timestamp: number }>();

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "anonymous";
    const now = Date.now();
    const current = rateStore.get(ip);
    if (!current || now - current.timestamp > RATE_WINDOW_MS) {
      rateStore.set(ip, { count: 1, timestamp: now });
    } else if (current.count >= RATE_MAX) {
      return new NextResponse("Too Many Requests", { status: 429 });
    } else {
      rateStore.set(ip, { count: current.count + 1, timestamp: current.timestamp });
    }
  }

  const nonce = generateNonce();
  const response = NextResponse.next();
  const securityHeaders: Record<string, string> = {
    "X-DNS-Prefetch-Control": "on",
    "Strict-Transport-Security": `max-age=${SECURITY.HSTS_MAX_AGE}; includeSubDomains; preload`,
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    "Content-Security-Policy": getCSPPolicy(nonce),
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  response.headers.set("x-nonce", nonce);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
