// @flow
interface ReadRepository<T> {
    list() : Promise<Array<T>>;
}

export default ReadRepository;