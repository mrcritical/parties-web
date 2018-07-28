// @flow
import type {ContactType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {CrudRepository} from "data/interfaces/CrudRepository";
import type {Contact, Profile} from "data/schema";
import type {CollectionReference, DocumentReference, DocumentSnapshot} from 'data/firestore';
import firestore, {DocumentSnapshot} from 'data/firestore';

export default class ContactRepository implements CrudRepository<ContactType> {

    contacts: CollectionReference = firestore.collection('contacts');

    profiles: CollectionReference = firestore.collection('profiles');

    async create(contact: ContactType, context: AuthContext) {
        const profileDoc: DocumentReference = await this.profiles.add({
            prefix: contact.name.prefix,
            first: contact.name.first,
            middle: contact.name.middle,
            last: contact.name.last,
            suffix: contact.name.suffix,
            emailAddresses: contact.emailAddresses,
            phoneNumbers: contact.phoneNumbers,
            physicalAddresses: contact.addresses,
        });

        const contactDoc: DocumentReference = await this.contacts.add({
            tags: contact.tags,
            profile: profileDoc,
            account: firestore.doc('accounts/' + context.account.id),
        });

        const contactData: Contact = contactDoc.data;
        const profileData: Profile = profileDoc.data;

        return {
            id: contactDoc.id,
            prefix: profileData.prefix,
            first: profileData.first,
            middle: profileData.middle,
            last: profileData.last,
            suffix: profileData.suffix,
            emailAddresses: profileData.emailAddresses,
            phoneNumbers: profileData.phoneNumbers,
            physicalAddresses: profileData.physicalAddresses,
            tags: contactData.tags,
        };
    }

    static async _fetch(doc: DocumentSnapshot): ContactType {
        const profileData = await doc.data().profile.get().data();
        return {
            id: doc.id,
            prefix: profileData.prefix,
            first: profileData.first,
            middle: profileData.middle,
            last: profileData.last,
            suffix: profileData.suffix,
            emailAddresses: profileData.emailAddresses,
            phoneNumbers: profileData.phoneNumbers,
            physicalAddresses: profileData.physicalAddresses,
            tags: doc.data().tags,
        };
    }

    async list(context: AuthContext): Array<ContactType> {
        return await this
            .contacts()
            .where("account", "==", firestore.doc('accounts/' + context.account.id))
            .get()
            .docs
            .map(async (doc: DocumentSnapshot): ContactType => {
                return ContactRepository._fetch(doc);
            });
    }

    async get(id: string, context: AuthContext): ContactType {
        const doc: DocumentSnapshot = await firestore
            .doc('contacts/' + id)
            .get();
        return await ContactRepository._fetch(doc);
    }

    async update(id: string, contact: ContactType, context: AuthContext): ContactType {
        const doc: DocumentSnapshot = await firestore
            .doc('contacts/' + id)
            .get();
        const profileData: DocumentReference = await doc.data().profile;
        await profileData.set({
            prefix: contact.name.prefix,
            first: contact.name.first,
            middle: contact.name.middle,
            last: contact.name.last,
            suffix: contact.name.suffix,
            emailAddresses: contact.emailAddresses,
            phoneNumbers: contact.phoneNumbers,
            physicalAddresses: contact.addresses,
        });
        await doc.ref.set({
            tags: contact.tags,
        }, {
            merge: true
        });
        contact.id = id;
        return contact;
    }

    async delete(id: String, currentUser: AuthContext): void {
        new Error('Not implemented yet');
    }
}