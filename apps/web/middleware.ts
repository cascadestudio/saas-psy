import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // For now, we're using localStorage for tokens (client-side)
  // So middleware can't validate JWT on server-side
  // Protected routes will be handled by UserContext on the client
  
  // You could enhance this later by:
  // 1. Using cookies instead of localStorage
  // 2. Validating JWT in middleware
  
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
