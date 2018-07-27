// @flow
import type {OrderType} from "types/AdminTypes";
import type {AuthContext} from "data/Context";
import type {ReadRepository} from "data/interfaces/ReadRepository";
import type {DeleteRepository} from "data/interfaces/DeleteRepository";
import type {UpdateRepository} from "data/interfaces/UpdateRepository";
import type {ProductType} from "types/Types";

type NewOrderItemType = {
    product: ProductType,
    quantity: number,
    total: number,
};

export type {
    NewOrderItemType,
};

export default class OrderRepository implements ReadRepository<OrderType>, DeleteRepository<OrderType>, UpdateRepository<OrderType> {

    async create(partyId: string, order: OrderType, context: AuthContext) : OrderType {
        new Error('Not implemented yet');
    }

    async list(partyId: string, context: AuthContext) : Array<OrderType> {
        new Error('Not implemented yet');
    }

    async addToBag(item: NewOrderItemType, context: AuthContext) : OrderType {
        new Error('Not implemented yet')
    }

    async removeFromBag(id: string, context: AuthContext) : OrderType {
        new Error('Not implemented yet');
    }

    async get(id: string, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async update(id: string, order: OrderType, context: AuthContext) {
        new Error('Not implemented yet');
    }

    async delete(id: String, currentUser: AuthContext) {
        new Error('Not implemented yet');
    }
}