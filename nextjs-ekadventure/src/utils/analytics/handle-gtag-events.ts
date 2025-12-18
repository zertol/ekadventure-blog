export const GA_MEASUREMENT_ID = 'G-NYY4JSF39D'; // Replace with your GA4 ID

// Track a page view
export const trackPageView = (pagePath: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: pagePath,
        });
    }
};

// Track custom events (like button clicks)
export const trackEvent = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};