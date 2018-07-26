// @flow

// @path('/accounts/<id>')
type Account = {
    id: string,
    plan: string, // ref<AccountPlan>
    bills?: Array<string>, // ref<Bill>
    discount: string, // ref<Discount>
};

// @path('/account-plans/<id>')
type AccountPlan = {
    id: string,
    name: string,
    cost: number,
    qualifier: PlanQualifier,
};

type PlanQualifier = 'monthly' | 'yearly' | 'quarterly' | 'lifetime';

// @path('/account-bills/<id>')
type Bill = {
    from: Date,
    to: Date,
    total: number,
    plan: string, // ref<AccountPlan>
    paidOn: Date,
};

// @path('/account-discounts/<id>')
type Discount = {
    id: string,
    name: string,
    code: string,
    percent: number,
}

// @path('/parties/<id>')
type Party = {
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

type PartyWhen = {
    created: Date,
    plannedStart?: Date,
    actualStart?: Date,
    plannedEnd?: Date,
    actualEnd?: Date,
    closed?: Date,
};

type PartySettings = {

}

type PartyStatus = 'created' | 'opened' | 'in_progress' | 'ended' | 'closed';

// @path('/parties/<id>/attendees/<id>')
type Attendee = {
    id: string,
    profile: string, // ref<Profile>
    handle: string,
    status: AttendeeStatus,
    host?: boolean,
    presenter?: boolean,
};

type AttendeeStatus = 'created' | 'invited' | 'accepted' | 'present' | 'attended' | 'no_show' | 'declined';

// @path('/parties/<id>/plans/<id>')
type PartyPlan = {
    id: string,
    by: string, // ref<Profile>
    when: string, // relative or a specific date
    text?: string,
    media?: Array<string>, // ref<Medium>
    actions?: Array<NamedAction>,
}

// @path('/users/<id>')
type User = {
    id: string,
    account: string, // ref<Account>
    profile: string, // ref<Profile>
};

// @path('/contacts/<id>')
type Contact = {
    id: string,
    profile?: string, // ref<Profile>
    tags?: Array<string>,
    account: string, // ref<Account>
};

// @path('/profiles/<id>')
type Profile = {
    id: string,
    prefix?: string,
    first: string,
    middle?: string,
    last: string,
    suffix?: string,
    avatar: Avatar,
    preferredHandle?: string,
    emailAddresses: Array<EmailAddress>,
    phoneNumbers?: Array<PhoneNumber>,
    physicalAddress?: Array<PhysicalAddress>,
    user?: string, // ref<User>
};

type Avatar = {
    url: string,
}

type PhysicalAddress = {
    label: string,
    line1: string,
    line2?: string,
    city: string,
    state: string,
    postalCode: string,
    country?: string,
}

type EmailAddress = {
    label: string,
    address: string,
}

type PhoneNumber = {
    label: string,
    number: string,
}

// @path('/channels/<id>')
type Channel = {
    id: string,
    members: Array<string>, // ref<Attendee>
    messages?: Array<string>, // ref<Message>
    party: string, // ref<Party>
};

// @path('/channels/<id>/messages/<id>')
type Message = {
    id: string,
    when: Date,
    by: string, // ref<Attendee>
    text: string,
};

type MediaType = 'video' | 'png' | 'jpeg';

type MediaSource = 'youtube' | 'facebook';

// @path('/media/<id>')
type Medium = {
    id: string,
    type: MediaType,
    url: string,
    source?: MediaSource,
    width?: number,
    height?: number,
    caption?: string,
    account: string, // ref<Account>
};

type NamedAction = {
    trigger: string,
};

// @path('/posts/<id>')
type Post = {
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
type Like = {
    id: string,
    by: string, // ref<Attendee>
}

// @path('/posts/<id>/comments/<id>')
type Comment = {
    id: string,
    when: Date,
    by: string, // ref<Attendee>
    text: string,
};

// @path('/orders/<id>')
type Order = {
    id: string,
    by: string, // ref<Attendee>
    items: Array<OrderItem>,
    total: number,
    account: string, // ref<Account>
    party: string, // ref<Party>
};

// @path('/orders/<id>/items/<id>')
type OrderItem = {
    id: string,
    product: string, // ref<Product>
    quantity: number,
    total: number,
};

// @path('/catalogs/<id>')
type Catalog = {
    id: string,
    name: string,
    products?: Array<string>, // ref<Product>
    categories?: Array<CatalogCategory>,
}

type CatalogCategory = {
    id: string,
    name: string,
};

// @path('/catalogs/<id>/products/<id>')
type Product = {
    id: string,
    name: string,
    cost: number,
    qualifier?: string,
    tags?: Array<string>,
    media?: Array<string>, // ref<Medium>
}