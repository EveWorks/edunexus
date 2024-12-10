import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-option";

export default async function middleware(req: NextRequest) {
  const AUTH_ROUTES = ["/dashboard", "/chat"];
  const path = `/${req.nextUrl.pathname.split("/")?.[1]}`;
  const token = await getToken({
    req,
    secureCookie: process.env.NODE_ENV !== "development",
    secret: process.env.NEXT_AUTH_SECRET_KEY,
  });
  const isAuthenticated = !!token;

  if (
    (path.startsWith("/signin") || path.startsWith("/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
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
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
