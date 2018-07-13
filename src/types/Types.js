import PropTypes from "prop-types";

const NameType = PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
});

const ImageType = PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    caption: PropTypes.string,
});

const AttendeeType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: NameType.isRequired,
    handle: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['present','joined','no-show','invited']),
    avatar: ImageType,
});

const CommentType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    by: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number,
});

const VideoType = PropTypes.shape({
    src: PropTypes.string.isRequired,
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

const AvailableActionType = PropTypes.shape({
    name: PropTypes.oneOf(['catalog']),
    action: PropTypes.func.isRequired,
});

const PostActionTriggerType = PropTypes.shape({
    trigger: PropTypes.oneOf(['catalog']),
});

const PostType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    by: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(CommentType),
    image: ImageType,
    video: VideoType,
    actions: PropTypes.arrayOf(PostActionTriggerType),
});

const MessageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    by: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
});

const BagItemType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
});

const BagType = PropTypes.shape({
    items: PropTypes.arrayOf(BagItemType),
    total: PropTypes.number.isRequired,
});

const ProductType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    qualifier: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
});

const CategoryType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
});

const CatalogType = PropTypes.shape({
    products: PropTypes.arrayOf(ProductType),
    categories: PropTypes.arrayOf(CategoryType),
    currency: PropTypes.string,
});

const AttendeeColorsType = PropTypes.shape({
    background: PropTypes.oneOf(['green']),
    online: PropTypes.oneOf(['white']),
    offline: PropTypes.oneOf(['pine']),
});

export {
    NameType,
    AttendeeType,
    CommentType,
    ImageType,
    VideoType,
    PostType,
    PostActionTriggerType,
    AvailableActionType,
    MessageType,
    BagType,
    BagItemType,
    CatalogType,
    CategoryType,
    ProductType,
    AttendeeColorsType,
};

