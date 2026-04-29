import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { EK_USER_SETTINGS_COOKIE_NAME } from './utils/constants';

type ValidLocale = typeof routing.locales[number];

const intlProxy = createMiddleware(routing);


export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const currentLocale = routing.locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) ?? routing.defaultLocale;

    const userSettingsCookie = request.cookies.get(EK_USER_SETTINGS_COOKIE_NAME)?.value;

    let languageCookie: string | null = null;

    if (userSettingsCookie) {
        try {
            const decoded = decodeURIComponent(userSettingsCookie);
            const userSettings: UserSettings = JSON.parse(decoded);
            const lang = userSettings.selected_language;

            if (routing.locales.includes(lang as ValidLocale)) {
                languageCookie = lang;
            }
        } catch (error) {
            console.log('parse error:', error);
        }
    }

    // Only redirect if cookie has a valid known locale that differs from current
    if (languageCookie && languageCookie !== currentLocale) {
        const pathnameHasLocale = routing.locales.some(
            (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        );

        let newPathname: string;

        if (pathnameHasLocale) {
            // Replace existing locale prefix
            newPathname = pathname.replace(`/${currentLocale}`, `/${languageCookie}`);
        } else if (languageCookie === routing.defaultLocale) {
            // Cookie matches default, no prefix needed
            newPathname = pathname;
        } else {
            // Add locale prefix
            newPathname = `/${languageCookie}${pathname}`;
        }

        if (newPathname !== pathname) {
            return NextResponse.redirect(new URL(newPathname, request.url));
        }
    }

    return intlProxy(request);
}

export const config = {
    // Match all paths except, _next, and files with extensions (dots)
    matcher: ['/', '/(en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};