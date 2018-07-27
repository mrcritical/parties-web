// @flow
import type {UserType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {CrudRepository} from "data/interfaces/CrudRepository";
import * as firebase from 'firebase';
import type {Profile} from "data/schema";
import type {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    QuerySnapshot
} from '@firebase/firestore';

const firestore: Firestore = firebase.firestore();

export default class UserRepository implements CrudRepository<UserType> {

    users: CollectionReference = firestore.collection('users');

    profiles: CollectionReference = firestore.collection('profiles');

    async create(user: UserType, context: AuthContext) {
        const profileDoc: DocumentReference = await this.profiles.add({
            prefix: user.name.prefix,
            first: user.name.first,
            middle: user.name.middle,
            last: user.name.last,
            suffix: user.name.suffix,
            emailAddresses: [
                {
                    label: 'primary',
                    value: user.email,
                }
            ],
        });

        const userDoc: DocumentReference = await this.users.add({
            profile: profileDoc,
            account: firestore.collection('accounts/' + context.account.id),
        });

        const profileData: Profile = profileDoc.data;
        return {
            id: userDoc.id,
            name: {
                prefix: profileData.prefix,
                first: profileData.first,
                middle: profileData.middle,
                last: profileData.last,
                suffix: profileData.suffix,
            },
            email: data
                .emailAddresses
                .find(emailAddress => emailAddress.label === 'primary')
                .value,
        };
    }

    async list(context: AuthContext) {
        const results: QuerySnapshot = await this.users.get();
        return results.docs.map(async doc => {
            return UserRepository._fetch(doc);
        });
    }

    static async _fetch(doc: DocumentSnapshot): UserType {
        const profileRef: DocumentReference = doc.data().profile;
        const profileData: Profile = await profileRef.get().data();
        return {
            id: doc.id,
            name: {
                prefix: profileData.prefix,
                first: profileData.first,
                middle: profileData.middle,
                last: profileData.last,
                suffix: profileData.suffix,
            },
            emailAddresses: profileData
                .emailAddresses
                .find(emailAddress => emailAddress.label === 'primary')
                .value,
        };
    }

    async get(id: string, context: AuthContext) {
        const doc: DocumentSnapshot = await firestore.doc('users/' + id).get();
        return await UserRepository._fetch(doc);
    }

    async update(id: string, user: UserType, context: AuthContext) {
        const userDoc: DocumentSnapshot = await firestore.doc('users/' + id).get();
        const profileDoc: DocumentReference = firestore.doc(userDoc.data.profile);
        const doc: Profile = {
            prefix: user.name.prefix,
            first: user.name.first,
            middle: user.name.middle,
            last: user.name.last,
            suffix: user.name.suffix,
            emailAddresses: [
                {
                    label: 'primary',
                    value: user.email,
                }
            ],
        };
        await profileDoc.set(doc);
        return {
            id: userDoc.id,
            name: {
                prefix: doc.prefix,
                first: doc.first,
                middle: doc.middle,
                last: doc.last,
                suffix: doc.suffix,
            },
            emailAddresses: doc
                .emailAddresses
                .find(emailAddress => emailAddress.label === 'primary')
                .value,
        };
    }

    async delete(id: String, currentUser: AuthContext) {
        const userDoc: DocumentSnapshot = await firestore.doc('users/' + id).get();
        const profileDoc: DocumentReference = firestore.doc(userDoc.data.profile);
        await profileDoc.delete();
        return await userDoc.delete();
    }

}