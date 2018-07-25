// @flow
import type {ReadRepository} from "data/interfaces/ReadRepository";
import type {UserType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";

export default class UserRepository implements ReadRepository<UserType> {
    get(id: string, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}