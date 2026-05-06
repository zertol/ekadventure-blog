export interface BaseAdConfig {
    title: string; // We want the title to come from the CMS and to be forced, even if it's gonna be used for the Wrapper
    slotId: string;
    provider: AdProviderType;
    wrapper?: {
        className?: string;
        isCollapsible?: boolean;
    }
}