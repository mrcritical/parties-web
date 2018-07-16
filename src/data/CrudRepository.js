// @flow
interface CrudRepository<T> {
    create(item: T) : Promise<T>;

    list() : Promise<Array<T>>;

    get(id: string): Promise<T>;

    update(id: string, item: T) : Promise<T>;

    delete(id: String) : Promise<Boolean>;
}

export default CrudRepository;