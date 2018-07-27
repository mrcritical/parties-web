// @flow

// @path('/accounts/<id>')
import {DocumentReference} from "firebase/firestore";

export type Account = {
    id: string,
    plan: string, // ref<AccountPlan>
    bills?: Array<string>, // ref<Bill>
    discount: string, // ref<Discount>
};

// @path('/account-plans/<id>')
export type AccountPlan = {
    id: string,
    name: string,
    cost: number,
    qualifier: PlanQualifier,
};

export type PlanQualifier = 'monthly' | 'yearly' | 'quarterly' | 'lifetime';

// @path('/account-bills/<id>')
export type Bill = {
    from: Date,
    to: Date,
    total: number,
    plan: string, // ref<AccountPlan>
    paidOn: Date,
};

// @path('/account-discounts/<id>')
export type Discount = {
    id: string,
    name: string,
    code: string,
    percent: number,
}

// @path('/parties/<id>')
export type Party = {
    id: string,
    name: string,
    when?: PartyWhen,
    autoStart: boolean,
    status: PartyStatus,
    presenters?: Array<string>, // ref<Attendee>
    hosts?: Array<string>, // ref<Attendee>
    attendees?: Array<string>, // ref<Attendee>
    account: string, // ref<Account>
    settings: PartySettings,
};

export type PartyWhen = {
    created: Date,
    plannedStart?: Date,
    actualStart?: Date,
    plannedEnd?: Date,
    actualEnd?: Date,
    closed?: Date,
};

export type PartySettings = {

}

export type PartyStatus = 'created' | 'opened' | 'in_progress' | 'ended' | 'closed';

// @path('/parties/<id>/attendees/<id>')
export type Attendee = {
    id: string,
    profile: string, // ref<Profile>
    handle: string,
    status: AttendeeStatus,
    host?: boolean,
    presenter?: boolean,
};

export type AttendeeStatus = 'created' | 'invited' | 'accepted' | 'present' | 'attended' | 'no_show' | 'declined';

// @path('/parties/<id>/plans/<id>')
export type PartyPlan = {
    id: string,
    by: string, // ref<Profile>
    when: string, // relative or a specific date
    text?: string,
    media?: Array<string>, // ref<Medium>
    actions?: Array<NamedAction>,
}

// @path('/users/<id>')
export type User = {
    id?: string,
    account: DocumentReference, // ref<Account>
    profile: DocumentReference, // ref<Profile>
};

// @path('/contacts/<id>')
export type Contact = {
    id?: string,
    profile?: DocumentReference, // ref<Profile>
    tags?: Array<string>,
    account: DocumentReference, // ref<Account>
};

// @path('/profiles/<id>')
export type Profile = {
    id?: string,
    prefix?: string,
    first: string,
    middle?: string,
    last: string,
    suffix?: string,
    avatar?: Avatar,
    preferredHandle?: string,
    emailAddresses: Array<ContactValue>,
    phoneNumbers?: Array<ContactValue>,
    physicalAddresses?: Array<PhysicalAddress>,
    user?: string, // ref<User>
};

export type Avatar = {
    url: string,
}

export type PhysicalAddress = {
    label: label,
    line1: string,
    line2?: string,
    city: string,
    state: string,
    postalCode: string,
    country?: string,
    preferred?: boolean,
}

export type label = 'primary' | 'home' | 'work' | 'mobile' | 'other';

export type ContactValue = {
    label: label,
    value: string,
    preferred?: boolean,
}

// @path('/channels/<id>')
export type Channel = {
    id: string,
    members: Array<string>, // ref<Attendee>
    messages?: Array<string>, // ref<Message>
    party: string, // ref<Party>
};

// @path('/channels/<id>/messages/<id>')
export type Message = {
    id: string,
    when: Date,
    by: string, // ref<Attendee>
    text: string,
};

export type MediaType = 'video' | 'png' | 'jpeg';

export type MediaSource = 'youtube' | 'facebook';

// @path('/media/<id>')
export type Medium = {
    id: string,
    type: MediaType,
    url: string,
    source?: MediaSource,
    width?: number,
    height?: number,
    caption?: string,
    account: string, // ref<Account>
};

export type NamedAction = {
    trigger: string,
};

// @path('/posts/<id>')
export type Post = {
    id: string,
    when: Date,
    by: string, // ref<Attendee>
    text?: string,
    media?: Array<string>, // ref<Medium>
    comments?: Array<string>, // ref<Comment>
    actions?: Array<NamedAction>,
    likes?: Array<string>, // ref<Like>
    party: string, // ref<Party>
};

// @path('/posts/<id>/likes/<id>')
export type Like = {
    id: string,
    by: string, // ref<Attendee>
}

// @path('/posts/<id>/comments/<id>')
export type Comment = {
    id: string,
    when: Date,
    by: string, // ref<Attendee>
    text: string,
};

// @path('/orders/<id>')
export type Order = {
    id: string,
    by: string, // ref<Attendee>
    items: Array<OrderItem>,
    total: number,
    account: string, // ref<Account>
    party: string, // ref<Party>
};

// @path('/orders/<id>/items/<id>')
export type OrderItem = {
    id: string,
    product: string, // ref<Product>
    quantity: number,
    total: number,
};

// @path('/catalogs/<id>')
export type Catalog = {
    id: string,
    name: string,
    products?: Array<string>, // ref<Product>
    categories?: Array<CatalogCategory>,
}

export type CatalogCategory = {
    id: string,
    name: string,
};

// @path('/catalogs/<id>/products/<id>')
export type Product = {
    id: string,
    name: string,
    cost: number,
    qualifier?: string,
    tags?: Array<string>,
    media?: Array<string>, // ref<Medium>
}