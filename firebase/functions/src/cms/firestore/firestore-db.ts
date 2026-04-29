import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const app = admin.initializeApp();
export const ekadventureBlogDb = getFirestore(app, "ekadventure-blog");