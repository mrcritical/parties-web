// @flow
import type {ContactType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {CrudRepository} from "data/interfaces/CrudRepository";
import firestore from 'data/firestore';
import type {Contact, Profile} from "data/schema";
import type {CollectionReference, DocumentReference, Firestore} from '@firebase/firestore';

export default class ContactRepository implements CrudRepository<ContactType> {

    contacts = firestore.collection('contacts');

    profiles = firestore.collection('profiles');

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
            profile: profileDoc.ref,
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

    async list(context: AuthContext): Array<ContactType> {
        new Error('Not implemented yet');
    }

    async get(id: string, context: AuthContext): ContactType {
        new Error('Not implemented yet');
    }

    async update(id: string, contact: ContactType, context: AuthContext): ContactType {
        new Error('Not implemented yet');
    }

    async delete(id: String, currentUser: AuthContext): void {
        new Error('Not implemented yet');
    }
}