// @flow
import type {AuthContext} from "data/Context";

interface UpdateRepository<T> {
    update(id: string, item: T, context: AuthContext) : Promise<T>;
}

export type {
    UpdateRepository
};