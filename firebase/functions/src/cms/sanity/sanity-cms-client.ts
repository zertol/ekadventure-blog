import { ICMSClient } from "../shared/interfaces/i-cms-client";
import { ICMSRepositories } from "../shared/interfaces/i-cms-repositories";
import { SanityRepositories } from "./sanity-repositories";

export class SantiyCMSClient implements ICMSClient {
    getRepositories(): ICMSRepositories {
        return new SanityRepositories();
    }
}