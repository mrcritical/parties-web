// @flow
import type {PartyType, CurrentUserType} from "types/AdminTypes";
import type CrudRepository from "interfaces/CrudRepository";

export default class PartyRepository implements CrudRepository<PartyType> {

    create(party: PartyType, currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    list(currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    get(id: string, currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    update(id: string, party: PartyType, currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    delete(id: String, currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}