export type Locale = "en" | "fr";

const strings = {
    email: {
        afterCheckout: {
            subject: {
                en: "Thank you for purchasing from our Store",
                fr: "Merci d'acheter de notre magasin."
            }
        }
        // subject: {
        //     en: "Your download is ready",
        //     fr: "Votre téléchargement est prêt",
        // },
        // body: {
        //     en: "Thank you for your purchase! Your download is ready.",
        //     fr: "Merci pour votre achat! Votre téléchargement est prêt.",
        // },
        // cta: {
        //     en: "Download your file",
        //     fr: "Télécharger votre fichier",
        // }
    }
} satisfies Record<string, any>;

export function t(path: string, locale: Locale): string {
    const keys = path.split(".");
    let current: any = strings;

    for (const key of keys) {
        current = current[key];
        if (!current) throw new Error(`Missing translation: ${path}`);
    }

    return current[locale];
}