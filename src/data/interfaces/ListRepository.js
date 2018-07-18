// @flow
interface ListRepository<T> {
    list() : Promise<Array<T>>;
}

export default ListRepository;