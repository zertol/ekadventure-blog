import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// This single function replaces all your manual path splitting and redirect logic
export default createMiddleware(routing);

export const config = {
    // Match all paths except, _next, and files with extensions (dots)
    matcher: ['/', '/(en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};