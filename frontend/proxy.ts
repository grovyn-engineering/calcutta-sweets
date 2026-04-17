import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth cookie lives on the API origin; `token` is not set on this host.
 * Do not redirect to /admin/login here — AdminLayout verifies via /auth/me + Bearer.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
