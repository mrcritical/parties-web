// @flow
import type {ReadRepository} from "./ReadRepository";
import type {ListRepository} from "./ListRepository";
import type {CreateRepository} from "./CreateRepository";
import type {UpdateRepository} from "./UpdateRepository";
import type {DeleteRepository} from "./DeleteRepository";

interface CrudRepository<T> extends ReadRepository<T>, ListRepository<T>, CreateRepository<T>, UpdateRepository<T>, DeleteRepository<T> {}

export type {
    CrudRepository
};