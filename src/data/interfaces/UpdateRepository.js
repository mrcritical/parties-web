// @flow
import {CurrentUserType} from "types/AdminTypes";

interface UpdateRepository<T> {
    update(id: string, item: T, currentUser: CurrentUserType) : Promise<T>;
}

export default UpdateRepository;