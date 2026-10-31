import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // not logged in: go to login, remember the page
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// only these routes are private
export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-books/:path*",
    "/my-borrows",
    "/books/:id",
    "/profile",
  ],
};