import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    // This is the key: it hides /en but keeps /fr visible
    localePrefix: 'as-needed',
    localeDetection: false, //If the user types ekadventure.com/about but he's already in fr locale, don't redirect him to /fr/about
    pathnames: {
        '/': '/',
        '/home': '/',
        '/blog': '/blog',
        '/accueil': '/',
        '/videos': '/videos',
        '/videos/[videoId]': '/videos/[videoId]',
        '/about': {
            en: '/about',
            fr: '/a-propos'
        },
        '/category/[categoryname]': {
            en: '/category/[categoryname]',
            fr: '/categorie/[categoryname]'
        },
        '/contact': {
            en: '/contact',
            fr: '/contactez-nous'
        },
        '/privacy-policy': {
            en: '/privacy-policy',
            fr: '/politique-de-confidentialite'
        },
        '/unsubscribe': {
            en: '/unsubscribe',
            fr: '/désabonnez'
        }
    }
});