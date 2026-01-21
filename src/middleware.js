import { NextResponse } from "next/server";

export function middleware(request) {
  // ১. Cookie theke token-ti nin
  const token = request.cookies.get("token")?.value;

  // ২. Bortoman path-ti nin
  const path = request.nextUrl.pathname;

  // ৩. Define korun kon route gulo protect korte chan
  const isProtectedRoute =
    path.startsWith("/addProduct") || path.startsWith("/profile");

  // ৪. Login/Register page-e login thaka user-ke jete diben na
  const isAuthPage = path === "/login" || path === "/register";

  // Logic: User login nai kintu protected route-e jete chay
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logic: User already login, tai login/register-e jawar dorkar nai
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ৫. Matcher diye define korun kothay kothay middleware cholbe
export const config = {
  matcher: ["/addProduct/:path*", "/profile/:path*", "/login", "/register"],
};
