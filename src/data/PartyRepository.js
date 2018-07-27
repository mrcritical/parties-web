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

    async create(party: PartyType, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async list(context: AuthContext) {
        new Error('Not implemented yet');
    }

    async get(id: string, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async addAttendee(partyId: string, attendee: NewAttendeeType, context: AuthContext): AttendeeType {
        new Error('Not implemented yet');
    }

    async emailAttendee(partyId: string, attendeeId: string, email: NewEmailType, context: AuthContext): void {
        new Error('Not implemented yet');
    }

    async sendAuthToAttendee(partyId: string, attendeeId: string, context: AuthContext): void {
        new Error('Not implemented yet');
    }

    async emailAttendees(partyId: string, email: NewEmailType, context: AuthContext): void {
        new Error('Not implemented yet');
    }

    async removeAttendee(partyId: string, attendeeId: string, context: AuthContext): void {
        new Error('Not implemented yet');
    }

    async update(id: string, party: PartyType, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async delete(id: String, currentUser: AuthContext) {
        new Error('Not implemented yet');
    }
}