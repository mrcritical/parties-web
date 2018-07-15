// @flow
import PropTypes from "prop-types";

// const NameType = PropTypes.shape({
//     first: PropTypes.string.isRequired,
//     last: PropTypes.string.isRequired,
// });

const ImageType = PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    caption: PropTypes.string,
});

// const AttendeeType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: NameType.isRequired,
//     handle: PropTypes.string.isRequired,
//     status: PropTypes.oneOf(['present','no-show','declined','invited','attended']),
//     avatar: ImageType,
// });

// const CommentType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     by: AttendeeType.isRequired,
//     when: PropTypes.any.isRequired,
//     text: PropTypes.string.isRequired,
// });

const VideoType = PropTypes.shape({
    url: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'youtube',
        'facebook',
        'soundcloud',
        'vimeo',
        'mp4'
    ]).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
});

// const AvailableActionType = PropTypes.shape({
//     name: PropTypes.oneOf(['catalog']),
//     action: PropTypes.func.isRequired,
// });

// const PostActionTriggerType = PropTypes.shape({
//     trigger: PropTypes.oneOf(['catalog']),
// });

// const PostType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     by: AttendeeType.isRequired,
//     when: PropTypes.any.isRequired,
//     text: PropTypes.string.isRequired,
//     likes: PropTypes.number,
//     comments: PropTypes.arrayOf(CommentType),
//     image: ImageType,
//     video: VideoType,
//     actions: PropTypes.arrayOf(PostActionTriggerType),
// });

// const MessageType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     by: AttendeeType.isRequired,
//     when: PropTypes.any.isRequired,
//     text: PropTypes.string.isRequired,
// });

// const BagItemType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     image: ImageType.isRequired,
//     quantity: PropTypes.number.isRequired,
//     cost: PropTypes.number.isRequired,
//     total: PropTypes.number.isRequired,
// });

// const BagType = PropTypes.shape({
//     items: PropTypes.arrayOf(BagItemType),
//     total: PropTypes.number.isRequired,
// });

// const ProductType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     image: ImageType.isRequired,
//     cost: PropTypes.number.isRequired,
//     qualifier: PropTypes.string,
//     tags: PropTypes.arrayOf(PropTypes.string),
// });

// const CategoryType = PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
// });

// const CatalogType = PropTypes.shape({
//     products: PropTypes.arrayOf(ProductType),
//     categories: PropTypes.arrayOf(CategoryType),
//     currency: PropTypes.string,
// });

type BackgroundColor = 'green';
type OnlineColor = 'white';
type OfflineColor = 'pine';

type AttendeeColorsType = {
    background?: BackgroundColor,
    online?: OnlineColor,
    offline?: OfflineColor,
};

type InitL = {
    formatMessage: Function,
    formatNumber: Function,
};

type MediaImage = {
    url: string,
    width?: number,
    height?: number,
    caption?: string,
};

type VideoSource = 'youtube' | 'facebook';

type MediaVideo = {
    url: string,
    source?: Array<VideoSource>,
    width?: number,
    height?: number,
};

type Name = {
    first: string,
    last: string,
};

type AttendeeStatus = 'present' | 'no-show' | 'declined' | 'invited' | 'attended';

type AttendeeType = {
    id: string,
    name: Name,
    handle: string,
    status?: AttendeeStatus,
    avatar: MediaImage,
};

type Comment = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
};

type ActionTrigger = 'catalog';

type PostActionTrigger = {
    trigger: ActionTrigger,
};

type Post = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
    likes?: number,
    comments?: Array<Comment>,
    image?: MediaImage,
    video?: MediaVideo,
    actions?: Array<PostActionTrigger>,
};

type Message = {
    id: string,
    by: AttendeeType,
    when: Date,
    text: string,
};

type Product = {
    id: string,
    name: string,
    image: Image,
    cost: number,
    qualifier?: string,
    tags?: Array<string>,
};

type Category = {
    id: string,
    name: string,
};

type CatalogType = {
    products: Array<Product>,
    categories?: Array<Category>,
    currency?: string,
};

type BagItem = {
    id: string,
    name: string,
    image: MediaImage,
    quantity: number,
    cost: number,
    total: number,
};

type BagType = {
    items: Array<BagItem>,
    total: number,
};

export type {
    InitL,
    MediaImage,
    MediaVideo,
    Comment,
    AttendeeType,
    Post,
    Message,
    CatalogType,
    Product,
    Category,
    BagType,
    BagItem,
    AttendeeColorsType,
};

export {
    //NameType,
    //AttendeeType,
    //CommentType,
    ImageType,
    VideoType,
    //PostType,
    //PostActionTriggerType,
    //MessageType,
    //BagType,
    //BagItemType,
    //CatalogType,
    //CategoryType,
    //ProductType,
    //AttendeeColorsType,
};

