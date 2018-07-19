// @flow
import {CurrentUserType} from "types/AdminTypes";

interface CreateRepository<T> {
    create(item: T, currentUser: CurrentUserType) : Promise<T>;
}

export default CreateRepository;