type ContactType = {
    email: string;
    unsubscribed: boolean;
    preferences: {
        locale: string | null;
    }
}