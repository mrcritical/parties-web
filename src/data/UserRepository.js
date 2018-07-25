// @flow
import type {UserType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {CrudRepository} from "data/interfaces/CrudRepository";

export default class UserRepository implements CrudRepository<UserType> {

    create(user: UserType, context: AuthContext) {
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

    update(id: string, user: UserType, context: AuthContext) {
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