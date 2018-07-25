// @flow
import type {PartyType} from "types/AdminTypes";
import type {CrudRepository} from "data/interfaces/CrudRepository";
import type {AuthContext} from "data/Context";
import type {AttendeeType, MediaImageType, NameType} from "types/Types";

type NewAttendeeType = {
    name: NameType,
    handle: string,
    avatar: MediaImageType,
};

type NewEmailType = {
    subject: string,
    text: string,
    asHTML: boolean,
};

export type {
    NewAttendeeType,
    NewEmailType,
};

export default class PartyRepository implements CrudRepository<PartyType> {

    create(party: PartyType, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    list(context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    get(id: string, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    addAttendee(partyId: string, attendee: NewAttendeeType, context: AuthContext): Promise<AttendeeType> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    emailAttendee(partyId: string, attendeeId: string, email: NewEmailType, context: AuthContext): Promise<void> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    sendAuthToAttendee(partyId: string, attendeeId: string, context: AuthContext): Promise<void> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    emailAttendees(partyId: string, email: NewEmailType, context: AuthContext): Promise<void> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    removeAttendee(partyId: string, attendeeId: string, context: AuthContext): Promise<void> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    update(id: string, party: PartyType, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    delete(id: String, currentUser: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}