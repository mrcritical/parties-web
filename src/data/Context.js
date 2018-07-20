// @flow
import type {NameType, MediaImageType} from "types/Types";
import * as React from "react";
import {User} from 'firebase/app';

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
    user: ?User,
    profile: ?ProfileType,
    account: ?AccountType,
}

const {Provider, Consumer} = React.createContext({
    hasLoaded: false,
    user: null,
    profile: null,
    account: null,
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