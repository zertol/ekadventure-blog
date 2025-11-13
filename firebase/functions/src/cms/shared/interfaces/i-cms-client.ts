import { ICMSRepositories } from "./i-cms-repositories";

export interface ICMSClient {
    getRepositories(): ICMSRepositories;
}