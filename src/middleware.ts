import { NextRequest, NextResponse } from "next/server";
import { protectedPaths, unprotectedPaths } from "./shared/constants/paths";

const protectedRoutes = new Set(Object.values(protectedPaths));
const unprotectedRoutes = new Set(Object.values(unprotectedPaths));

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  // Handle protected routes
  if (protectedRoutes.has(url.pathname)) {
    if (!accessToken) {
      const redirectUrl = unprotectedPaths.login;
      const attemptedPath = req.nextUrl.pathname + req.nextUrl.search;
      url.pathname = redirectUrl;
      url.searchParams.set("redirect", attemptedPath);
      return NextResponse.redirect(url);
    }
  }

  // Handle unprotected routes
  if (unprotectedRoutes.has(url.pathname)) {
    if (accessToken) {
      url.pathname = protectedPaths.dashboard;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
