// @flow
import {CurrentUserType} from "types/AdminTypes";

interface ReadRepository<T> {
    get(id: string, currentUser: CurrentUserType) : Promise<Array<T>>;
}

export default ReadRepository;