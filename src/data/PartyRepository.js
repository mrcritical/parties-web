// @flow
import type {PartyType} from "types/AdminTypes";
import type CrudRepository from "interfaces/CrudRepository";

export default class PartyRepository implements CrudRepository<PartyType> {

    create(party: PartyType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    get(id: string) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    update(id: string, party: PartyType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    delete(id: String) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}