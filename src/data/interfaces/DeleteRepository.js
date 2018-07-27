// @flow
import type {AuthContext} from "data/Context";

interface DeleteRepository<T> {
    delete(id: String, context: AuthContext): void;
}

export type {
    DeleteRepository
} ;