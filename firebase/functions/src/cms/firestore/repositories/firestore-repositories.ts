import { IContactRepository } from "../../shared/interfaces/i-contact-repository";
import { IProductRepository } from "../../shared/interfaces/i-product-repository";
import { FirestoreContactRepository } from "./contact/firestore-contact-repository";
import { IFirestoreRepositories } from "./i-firestore-repositories";
import { FirestoreProductRepository } from "./product/firestore-product-repository";

export class FirestoreRepositories implements IFirestoreRepositories {
    contact: IContactRepository;
    product: IProductRepository;

    constructor() {
        this.contact = new FirestoreContactRepository();
        this.product = new FirestoreProductRepository();
    }
}