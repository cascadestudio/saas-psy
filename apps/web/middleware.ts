import { type NextRequest, NextResponse } from "next/server";

const PRODUCTION_HOST = "www.melya.app";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // staging.melya.app et les previews Vercel servent le même code que la
  // prod, robots.txt compris : sans ce header, Google les indexe.
  if (request.headers.get("host") !== PRODUCTION_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
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
