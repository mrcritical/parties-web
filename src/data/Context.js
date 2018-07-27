// @flow
import type {NameType, MediaImageType} from "types/Types";
import * as React from "react";

type AccountType = {
    id: string,
};

type ProfileType = {
    id: string,
    name: NameType,
    userId: string,
    handle: string,
    avatar: MediaImageType,
};

type AuthContext = {
    hasLoaded: boolean,
    user: ?$npm$firebase$auth$User,
    profile?: ?ProfileType,
    account?: ?AccountType,
    partyId?: string,
}

const {Provider, Consumer} = React.createContext({
    hasLoaded: false,
});

export type {
    AuthContext,
    AccountType,
    ProfileType,
}

export {
    Provider,
    Consumer,
};