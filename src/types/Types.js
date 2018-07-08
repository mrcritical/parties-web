import {number, shape, string, any, arrayOf} from "prop-types";

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
    when: any.isRequired,
    text: string.isRequired,
    likes: number,
});

const PostType = shape({
    id: string.isRequired,
    from: AttendeeType.isRequired,
    when: any.isRequired,
    text: string.isRequired,
    likes: number,
    comments: arrayOf(CommentType)
});

const MessageType = shape({
    id: string.isRequired,
    from: AttendeeType.isRequired,
    when: any.isRequired,
    text: string.isRequired,
});

export {
    NameType,
    AttendeeType,
    CommentType,
    PostType,
    MessageType
};

