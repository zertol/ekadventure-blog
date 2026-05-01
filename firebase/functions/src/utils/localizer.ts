import { ProductItemType } from "../types/ecommerce/product-metadata-type";

export type Locale = "en" | "fr";

export const strings = {
    common: {
        productItemLabel: {
            [ProductItemType.Photo]: {
                en: "photo",
                fr: "photo"
            },
            [ProductItemType.PDF]: {
                en: "document",
                fr: "document"
            }
        }
    },
    email: {
        onboarding: {
            subject: {
                en: "Welcome to Ekadventure",
                fr: "Bienvenue au Ekadventure"
            },
            greeting: {
                en: "Hey Fellow Adventurer,",
                fr: "Salut l'aventurier(ère),"
            },
            body: {
                en: "Thanks for subscribing! You'll get hiking guides, trail tips, and outdoor stories straight to your inbox.",
                fr: "Merci pour votre inscription ! Vous recevrez des guides de randonnée, des conseils de sentiers et des histoires d'aventure directement dans votre boîte de réception."
            },
            cta: {
                en: "Explore the Blog →",
                fr: "Explorez le Blogue →"
            },
            footer: {
                en: "Want to stop receiving these emails? You can",
                fr: "Vous ne souhaitez plus recevoir ces courriels? Vous pouvez"
            },
            unsubscribe: {
                en: "unsubscribe here",
                fr: "désabonnez ici"
            },
            signature: {
                en: "See you on the Trail,<br />Elie - Ekadventure",
                fr: "Bonne Rando,<br />Elie - Ekadventure"
            }
        },
        broadcast: {
            subject: {
                en: (title: string) => `New Article: ${title} by Ekadventure`,
                fr: (title: string) => `Nouvel Article: ${title} par Ekadventure`
            },
            greeting: {
                en: "Hey Fellow Adventurer,",
                fr: "Salut l'aventurier(ère),"
            },
            body: {
                en: "I'm so excited to share my latest article with you!",
                fr: "Je suis très heureux de vous partager mon dernier article!"
            },
            cta: {
                en: "Read the article →",
                fr: "Lisez l'article →"
            },
            footer: {
                en: "Want to stop receiving these emails? You can",
                fr: "Vous ne souhaitez plus recevoir ces courriels? Vous pouvez"
            },
            unsubscribe: {
                en: "unsubscribe here",
                fr: "désabonnez ici"
            },
            signature: {
                en: "See you on the Trail,<br />Elie - Ekadventure",
                fr: "Bonne Rando,<br />Elie - Ekadventure"
            }
        },
        downloadReady: {
            subject: {
                en: (itemLabel: string) => `Your ${itemLabel} is ready to download`,
                fr: (itemLabel: string) => `Votre ${itemLabel} est prête à télécharger`
            },
            greeting: {
                en: (customerName: string) => `Hey ${customerName},`,
                fr: (customerName: string) => `Bonjour ${customerName},`
            },
            thankYou: {
                en: "Thank you so much for your purchase! It truly means a lot and helps me continue creating, exploring the world and share it with you.",
                fr: "Merci beaucoup pour votre achat! Cela signifie vraiment beaucoup et m'aide à continuer à créer, à explorer le monde et le partager avec vous."
            },
            body: {
                en: (itemLabel: string, expiresIn: string) => `Your ${itemLabel} is now ready. Click the button below to download your file. The link is valid for ${expiresIn} days.`,
                fr: (itemLabel: string, expiresIn: string) => `Votre ${itemLabel} est maintenant prête. Cliquez sur le bouton ci-dessous pour télécharger votre fichier. Le lien est valide pendant ${expiresIn} jours.`
            },
            cta: {
                en: (itemLabel: string) => `Download your ${itemLabel}`,
                fr: (itemLabel: string) => `Télécharger votre ${itemLabel}`
            },
            footer: {
                en: "If you have any questions, feel free to reply to this email.",
                fr: "Si vous avez des questions, n'hésitez pas à répondre à ce courriel."
            },
            signature: {
                en: "Happy exploring,<br />Elie - Ekadventure",
                fr: "Bonne aventure,<br />Elie - Ekadventure"
            }
        }
    }
} satisfies Record<string, any>;