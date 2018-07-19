// @flow
import {CurrentUserType} from "types/AdminTypes";

interface ListRepository<T> {
    list(currentUser: CurrentUserType) : Promise<Array<T>>;
}

export default ListRepository;