// @flow
import type {AuthContext} from "data/Context";

interface ListRepository<T> {
    list(context: AuthContext) : Array<T>;
}

export type {
    ListRepository
};