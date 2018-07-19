// @flow
import type ReadRepository from "./interfaces/ReadRepository";
import {UserType, CurrentUserType} from "types/AdminTypes";

export default class UserRepository implements ReadRepository<UserType> {
    get(id: string, currentUser: CurrentUserType) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}