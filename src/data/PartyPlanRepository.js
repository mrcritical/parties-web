// @flow
import type {PartyPlanType, PartyPlanActionType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {ReadRepository} from "data/interfaces/ReadRepository";
import type {DeleteRepository} from "data/interfaces/DeleteRepository";
import type {UpdateRepository} from "data/interfaces/UpdateRepository";

type NewPartyPlanType = {
    minutesFromStart: number,
    action: PartyPlanActionType,
};

export type {
    NewPartyPlanType,
};

export default class PartyPlanRepository implements ReadRepository<PartyPlanType>, DeleteRepository<PartyPlanType>, UpdateRepository<PartyPlanType> {

    async create(partyId: string, plan: NewPartyPlanType, context: AuthContext) : PartyPlanType {
        new Error('Not implemented yet');
    }

    async list(partyId: string, context: AuthContext) : Array<PartyPlanType> {
        new Error('Not implemented yet');
    }

    async get(id: string, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async update(id: string, plan: PartyPlanType, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async delete(id: String, currentUser: AuthContext) {
        new Error('Not implemented yet');
    }
}