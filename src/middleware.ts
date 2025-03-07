import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-option";

export default async function middleware(req: NextRequest) {
  const AUTH_ROUTES = ["/dashboard", "/chat", "/verify", "/plan"];
  const path = `/${req.nextUrl.pathname.split("/")?.[1]}`;
  const token = await getToken({
    req,
    secureCookie: process.env.NODE_ENV !== "development",
    secret: process.env.NEXT_AUTH_SECRET_KEY,
  });
  const isAuthenticated = !!token;
  const user = (token as any)?.user?.user;
  const subscription = (token as any)?.user?.subscription;

  if (
    (path.startsWith("/signin") || path.startsWith("/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    !path.startsWith("/verify") &&
    !user?.isEmailVerified &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/verify", req.url));
  }

  if (
    !path.startsWith("/plan") &&
    !path.startsWith("/verify") &&
    !path.startsWith("/payment") &&
    (!subscription || new Date(subscription?.renewDate) < new Date()) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/plan", req.url));
  }

  if (AUTH_ROUTES.includes(path) && !isAuthenticated) {
    return await withAuth(req as NextRequestWithAuth, {
      secret: process.env.NEXT_AUTH_SECRET_KEY,
      pages: {
        ...pagesOptions,
      },
    });
  }

  return NextResponse.rewrite(req.url);
}

// config to match all pages
export const config = {
  matcher: [
    "/((?!api|_next/static|sw.js|sw.js.map|favicon.ico|workbox-*|_next/image|.*\\.png$).*)",
  ],
};
