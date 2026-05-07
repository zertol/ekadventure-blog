type ContactType = {
    name: string;
    email: string;
    unsubscribed: boolean;
    preferences: {
        locale: string | null;
    }
}