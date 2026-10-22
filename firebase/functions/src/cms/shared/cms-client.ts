import { RepositorySetType } from "../../types/domain/repository-set-type";
import { FirestoreRepositories } from "../firestore/repositories/firestore-repositories";
import { SanityRepositories } from "../sanity/sanity-repositories";
import { ICMSClient } from "./interfaces/i-cms-client";

export class CMSClient implements ICMSClient {
    private readonly repositories: RepositorySetType;

    // Lazy load the underlying repos
    private _firestore?: FirestoreRepositories;
    private _sanity?: SanityRepositories;

    private get firestore() {
        return this._firestore ??= new FirestoreRepositories();
    }

    private get sanity() {
        return this._sanity ??= new SanityRepositories();
    }

    constructor() {
        this.repositories = {
            ...this.sanity,
            ...this.firestore
        };
    }

    getRepositories(): RepositorySetType {
        return this.repositories;
    }
}