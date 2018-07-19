// @flow
import {CurrentUserType} from "types/AdminTypes";

interface DeleteRepository<T> {
    delete(id: String, currentUser: CurrentUserType) : Promise<Boolean>;
}

export default DeleteRepository;