// @flow
import type {AuthContext} from "../Context";

interface CreateRepository<T> {
    create(item: T, context: AuthContext) : T;
}

export type {
    CreateRepository
}