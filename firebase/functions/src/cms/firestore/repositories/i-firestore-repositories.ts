import { IContactRepository } from "../../shared/interfaces/i-contact-repository";
import { IProductRepository } from "../../shared/interfaces/i-product-repository";

export interface IFirestoreRepositories {
    contact: IContactRepository;
    product: IProductRepository;
}