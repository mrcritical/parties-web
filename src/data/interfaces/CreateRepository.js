// @flow
import type {AuthContext} from "../Context";

interface CreateRepository<T> {
    create(item: T, context: AuthContext) : Promise<T>;
}

export type {
    CreateRepository
}