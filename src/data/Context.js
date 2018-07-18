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

class UserContext {
    account: AccountType;
    profile: ProfileType;
};

const {Provider, Consumer} = React.createContext(new UserContext());

export type {
    AccountType,
    ProfileType,
}

export {
    UserContext,
    Provider,
    Consumer,
};