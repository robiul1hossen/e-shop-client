import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isProtectedRoute =
    path.startsWith("/addProduct") ||
    path.startsWith("/profile") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/listItem") ||
    path.startsWith("/manageUsers");

  const isAdminRoute = path.startsWith(
    "/manageUsers" && "/addProduct" && "/listItem",
  );

  const isAuthPage = path === "/login" || path === "/register";

  // 🔒 Protected routes → login required
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // 🔁 Logged in user cannot access login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 👑 Admin-only access
  if (token && isAdminRoute) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (err) {
      // invalid token format
      return NextResponse.redirect(new URL("/login", request.url));
    }
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
    "/login",
    "/register",
  ],
};
