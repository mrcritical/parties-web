// @flow

type BackgroundColorType = 'green';
type OnlineColorType = 'white';
type OfflineColorType = 'pine';

type AttendeeColorsType = {
    background?: BackgroundColorType,
    online?: OnlineColorType,
    offline?: OfflineColorType,
};

type IntLType = {
    formatMessage: Function,
    formatNumber: Function,
};

type MediaImageType = {
    url: string,
    width?: number,
    height?: number,
    caption?: string,
};

type VideoSourceType = 'youtube' | 'facebook';

type MediaVideoType = {
    url: string,
    source?: Array<VideoSourceType>,
    width?: number,
    height?: number,
};

type NameType = {
    first: string,
    last: string,
};

type AttendeeStatusType = 'present' | 'no-show' | 'declined' | 'invited' | 'attended';

type AttendeeType = {
    id: string,
    name: NameType,
    handle: string,
    status?: AttendeeStatusType,
    avatar: MediaImageType,
};

type CommentType = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
};

type ActionTriggerType = 'catalog';

type PostActionTriggerType = {
    trigger: ActionTriggerType,
};

type PostType = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
    likes?: number,
    liked?: boolean,
    comments?: Array<CommentType>,
    image?: MediaImageType,
    video?: MediaVideoType,
    actions?: Array<PostActionTriggerType>,
};

type MessageType = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
};

type ProductType = {
    id: string,
    name: string,
    image: MediaImageType,
    cost: number,
    qualifier?: string,
    tags?: Array<string>,
};

type CategoryType = {
    id: string,
    name: string,
};

type CatalogType = {
    products: Array<ProductType>,
    categories?: Array<CategoryType>,
    currency?: string,
};

type BagItemType = {
    id: string,
    name: string,
    image: MediaImageType,
    quantity: number,
    cost: number,
    total: number,
};

type BagType = {
    items: Array<BagItemType>,
    total: number,
};

export type {
    IntLType,
    NameType,
    MediaImageType,
    MediaVideoType,
    CommentType,
    AttendeeType,
    PostType,
    MessageType,
    CatalogType,
    ProductType,
    CategoryType,
    BagType,
    BagItemType,
    AttendeeColorsType,
};

