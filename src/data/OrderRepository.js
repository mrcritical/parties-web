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

    create(partyId: string, order: OrderType, context: AuthContext) : Promise<OrderType> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    list(partyId: string, context: AuthContext) : Promise<Array<OrderType>> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    addToBag(item: NewOrderItemType, context: AuthContext) : Promise<OrderType> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    removeFromBag(id: string, context: AuthContext) : Promise<OrderType> {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    get(id: string, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    update(id: string, order: OrderType, context: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }

    delete(id: String, currentUser: AuthContext) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not implemented yet'));
        });
    }
}