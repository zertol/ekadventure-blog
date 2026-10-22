import { RepositorySetType } from "../../../types/domain/repository-set-type";

export interface ICMSClient {
    getRepositories(): RepositorySetType;
}