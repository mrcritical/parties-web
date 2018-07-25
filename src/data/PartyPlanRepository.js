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

    create(partyId: string, plan: NewPartyPlanType, context: AuthContext) : Promise<PartyPlanType> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    list(partyId: string, context: AuthContext) : Promise<Array<PartyPlanType>> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    get(id: string, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    update(id: string, plan: PartyPlanType, context: AuthContext) {
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