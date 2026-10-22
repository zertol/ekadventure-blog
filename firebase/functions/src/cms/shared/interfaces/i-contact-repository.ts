import { ContactType } from "../../../types/domain/contact-type";

export interface IContactRepository {
    getAllContacts(): Promise<Map<string, ContactType>>;
    addContactDetails(locale: string, id: string, contactInfo: ContactType): Promise<void>;
}