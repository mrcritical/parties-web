import PropTypes from "prop-types";

const NameType = PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
});

const AttendeeType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: NameType.isRequired,
    handle: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['present','joined','no-show','invited']),
});

const CommentType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number,
});

const PostType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(CommentType)
});

const MessageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: AttendeeType.isRequired,
    when: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
});

const BagItemType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    costPer: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
});

const BagType = PropTypes.shape({
    items: PropTypes.arrayOf(BagItemType),
    total: PropTypes.number.isRequired,
});

export {
    NameType,
    AttendeeType,
    CommentType,
    PostType,
    MessageType,
    BagType,
    BagItemType,
};

