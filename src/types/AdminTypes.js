// @flow

import type {
    AttendeeColorsType,
    AttendeeType,
    MediaImageType,
    MediaVideoType,
    MessageType,
    NameType,
    PostType,
    ProductType
} from "types/Types";

type PartyType = {
    id: string,
    name: string,
    when: PartyWhenType,
    autoStart: boolean,
    status: PartyStatusType,
    presenters: Array<AttendeeType>,
    hosts: Array<AttendeeType>,
    guests: Array<AttendeeType>,
    posts: Array<PostType>,
    chats: Array<ChatsType>,
    orders: Array<OrderType>,
    plans: Array<PartyPlanType>,
    settings?: PartySettingsType,
};

type PartyWhenType = {
    created: Date,
    plannedStart: ?Date,
    actualStart: ?Date,
    ended: ?Date,
    closed: ?Date,
};

type WelcomeBackgroundSettingsType = {
    image? : MediaImageType,
    color: string,
};

type WelcomeSettingsType = {
    background?: WelcomeBackgroundSettingsType,
};

type HeaderColorSettingsType = {
  text: string,
  background: string,
  contrast: boolean,
  bag: string,
};

type HeaderSettingsType = {
    image?: MediaImageType,
    colors: HeaderColorSettingsType,
};

type HighlightSettingsType = {
    highlight: AttendeeColorsType,
};

type AttendeeSettingsType = {
    colors: HighlightSettingsType,
};

type PartySettingsType = {
    welcome: WelcomeSettingsType,
    header: HeaderSettingsType,
    attendees: AttendeeSettingsType
};

type PartyStatusType = 'created' | 'started' | 'ended' | 'closed';

type PartyPlanType = {
    id: string,
    minutesFromStart: number,
    action: PartyPlanActionType,
};

type PlanActionTypeType = 'post';

type PartyPlanActionType = {
    type: PlanActionTypeType,
    by: AttendeeType,
    text: string,
    image?: MediaImageType,
    video?: MediaVideoType,
};

type OrderType = {
    id: string,
    by: AttendeeType,
    items: Array<OrderItemType>,
    total: number,
};

type OrderItemType = {
    id: string,
    product: ProductType,
    quantity: number,
    total: number,
};

type ChatsType = {
    participants: Array<AttendeeType>,
    messages: Array<MessageType>,
};

type UserType = {
    id: string,
    email: string,
    name: NameType,
};

type AccountPlanType = 'basic';

type AccountType = {
    id: string,
    users: Array<UserType>,
    plan: AccountPlanType,
    created: Date,
    closed?: Date,
    billHistory: Array<BillType>,
};

type BillType = {
    from: Date,
    to: Date,
    due: Date,
    paid: boolean,
    plan: AccountPlanType,
    total: number,
};

type ContactValueType = {
    label: string,
    value: string,
    preferred: boolean,
};

type AddressType = {
    label: string,
    line1: string,
    line2: string,
    city: string,
    province: string,
    postalCode: string,
    countryCode: string,
    preferred: boolean,
};

type ContactType = {
    id: string,
    name: NameType,
    emailAddresses: Array<ContactValueType>,
    phoneNumbers?: Array<ContactValueType>,
    addresses?: Array<AddressType>,
    tags?: Array<string>,
    parties?: Array<string>,
};

export type {
    PartyType,
    PartyWhenType,
    WelcomeBackgroundSettingsType,
    WelcomeSettingsType,
    HeaderColorSettingsType,
    HeaderSettingsType,
    HighlightSettingsType,
    AttendeeSettingsType,
    PartySettingsType,
    PartyStatusType,
    PartyPlanType,
    PlanActionTypeType,
    PartyPlanActionType,
    OrderType,
    OrderItemType,
    ChatsType,
    AccountType,
    AccountPlanType,
    BillType,
    UserType,
    ContactType,
    AddressType,
    ContactValueType,
};

