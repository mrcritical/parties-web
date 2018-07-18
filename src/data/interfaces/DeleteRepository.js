// @flow
interface DeleteRepository<T> {
    delete(id: String) : Promise<Boolean>;
}

export default DeleteRepository;