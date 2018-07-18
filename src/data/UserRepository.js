// @flow
import type ReadRepository from "./interfaces/ReadRepository";
import {UserType} from "types/AdminTypes";

export default class PartyRepository implements ReadRepository<UserType> {
    get(id: string) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}