import { IFirestoreRepositories } from "../../cms/firestore/repositories/i-firestore-repositories";
import { ICMSRepositories } from "../../cms/shared/interfaces/i-cms-repositories";

export type RepositorySetType = ICMSRepositories & IFirestoreRepositories;