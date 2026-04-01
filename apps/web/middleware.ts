import { type NextRequest, NextResponse } from "next/server";

const isPrelaunch = process.env.NEXT_PUBLIC_APP_MODE === "prelaunch";

// App routes that should not be accessible in pre-launch mode
const APP_ROUTES = ["/dashboard", "/patients", "/echelles", "/send-scale", "/results", "/sign-up", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In pre-launch mode, redirect app routes to landing page
  if (isPrelaunch && APP_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
