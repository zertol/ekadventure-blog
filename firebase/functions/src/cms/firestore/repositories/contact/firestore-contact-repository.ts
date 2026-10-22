import { ContactType } from "../../../../types/domain/contact-type";
import { IContactRepository } from "../../../shared/interfaces/i-contact-repository";
import { ekadventureBlogDb } from "../../firestore-db";

export class FirestoreContactRepository implements IContactRepository {
    async getAllContacts(): Promise<Map<string, ContactType>> {
        const contactsMap = new Map<string, ContactType>();
        try {
            const contactsSnapshot = await ekadventureBlogDb.collection("contacts").get();
            contactsSnapshot.docs.forEach((doc) => {
                const data = doc.data() as ContactType;
                contactsMap.set(data.email, data);
            });
            return contactsMap;
        } catch (err) {
            throw new Error(`Failed to get contacts: ${err}`);
        }
    }

    async addContactDetails(locale: string, id: string, contactInfo: ContactType): Promise<void> {
        try {
            await ekadventureBlogDb.collection("contacts").doc(id).set({
                name: contactInfo.name,
                email: contactInfo.email,
                preferences: {
                    locale: locale ?? "en"
                }
            });
        } catch (err) {
            console.error(`Failed to create contact: ${err}`);
            throw new Error(`Failed to create contact: ${err}`);
        }
    }
}