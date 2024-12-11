import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Clerk Middleware
export default function middleware(req: NextRequest) {
  // Run Clerk Middleware first
  clerkMiddleware()(req, {} as any);

  // Run next-intl Middleware for internationalization
  return createMiddleware({
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  })(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Match internationalized pathnames
    '/(ar|en)/:path*',
  ],
};
