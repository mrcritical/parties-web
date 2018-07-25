// @flow
import type {PartyType} from "types/AdminTypes";
import type {CrudRepository} from "data/interfaces/CrudRepository";
import type {AuthContext} from "./Context";

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