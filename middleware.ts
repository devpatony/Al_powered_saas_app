import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { clerkMiddleware } from "@clerk/nextjs/server";

const publicRoutes = ["/api/webhooks/clerk"];

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }
  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};