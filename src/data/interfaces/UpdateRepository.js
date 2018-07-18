// @flow
interface UpdateRepository<T> {
    update(id: string, item: T) : Promise<T>;
}

export default UpdateRepository;