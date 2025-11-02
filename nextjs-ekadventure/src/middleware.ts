import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // If the path is /home, redirect to /
    if (path === '/home') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configure the paths that should trigger this middleware
export const config = {
    matcher: '/home',
}; 