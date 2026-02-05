import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  console.log("current token", !!token);

  const isProtectedRoute =
    path.startsWith("/profile") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/addProduct") ||
    path.startsWith("/listItem") ||
    path.startsWith("/myCart") ||
    path.startsWith("/manageUsers");

  const isAdminRoute =
    path.startsWith("/manageUsers") ||
    path.startsWith("/addProduct") ||
    path.startsWith("/listItem");

  const isAuthPage = path === "/login" || path === "/register";

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAdminRoute) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/addProduct/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/listItem/:path*",
    "/manageUsers/:path*",
    "/myCart/:path*",
    "/login",
    "/register",
  ],
};
