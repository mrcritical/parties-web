// @flow
import type {AuthContext} from "data/Context";

interface ReadRepository<T> {
    get(id: string, context: AuthContext) : Array<T>;
}

export type {
    ReadRepository
};