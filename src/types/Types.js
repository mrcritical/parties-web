import {number, shape, string} from "prop-types";

const NameType = shape({
    first: string.isRequired,
    last: string.isRequired,
});

const AttendeeType = shape({
    id: string.isRequired,
    name: NameType.isRequired,
    handle: string.isRequired,
});

const CommentType = shape({
    id: string.isRequired,
    from: AttendeeType.isRequired,
    when: string.isRequired,
    text: string.isRequired,
    likes: number,
});

const PostType = shape({
    id: string.isRequired,
    from: AttendeeType.isRequired,
    when: string.isRequired,
    text: string.isRequired,
    likes: number,
});

const MessageType = shape({
    id: string.isRequired,
    from: AttendeeType.isRequired,
    when: string.isRequired,
    text: string.isRequired,
});

export {
    NameType,
    AttendeeType,
    CommentType,
    PostType,
    MessageType
};

