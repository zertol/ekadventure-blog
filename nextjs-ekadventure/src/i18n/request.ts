import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'fr'];

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    // 3. Validate that the incoming `locale` is supported
    if (!locale || !locales.includes(locale as any)) {
        notFound();
    }



    return {
        locale: locale as string,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});