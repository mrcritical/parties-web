// @flow
interface CreateRepository<T> {
    create(item: T) : Promise<T>;
}

export default CreateRepository;