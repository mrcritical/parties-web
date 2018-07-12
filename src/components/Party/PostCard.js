import React from 'react';
import {Box, Button, Image, Text} from 'gestalt';
import Moment from 'react-moment';
import 'moment-timezone';
import {PostType} from "types/Types";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

const translations = defineMessages({
    commentsLabel: {
        id: 'post.comments_label',
        defaultMessage: '{itemCount, plural, one {Comment} other {Comments}}',
    },
    likesLabel: {
        id: 'post.likes_label',
        defaultMessage: '{itemCount, plural, one {Like} other {Likes}}',
    },
    defaultImageCaption: {
        id: 'post.default_image_caption',
        defaultMessage: 'Posted Image',
    },
});

class PostCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
        };
        this._handleLike = this._handleLike.bind(this);
        this.myRef = React.createRef();
    }

    _handleLike(post) {
        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        this.forceUpdate();
    }

    getMediaContent(post) {
        const {formatMessage} = this.props.intl;
        if (post.image) {
            return <Box
                color="white"
                height={post.image.height ? post.image.height : 200}
                width="100%"
                marginTop={4}
            >
                <Image src={post.image.src}
                       fit="cover"
                       alt={post.image.caption ? post.image.caption : formatMessage(translations.defaultImageCaption)}
                       naturalWidth={post.image.width ? post.image.width : 0}
                       naturalHeight={post.image.height ? post.image.height : 0}
                />
            </Box>;

        } else if (post.video) {
            return <Box
                color="white"
                height={post.video.height ? post.video.height : 360}
                width="100%"
                direction="row"
                display="flex"
                justifyContent="center"
                marginTop={4}
            >
                <ReactPlayer url={post.video.src}
                             width={post.video.width ? post.video.width : 640}
                             height={post.video.height ? post.video.height : 360}
                             controls/>
            </Box>;
        } else {
            return null;
        }
    }

    render() {
        const {post} = this.state;
        const {highlighted} = this.props;
        const {formatMessage} = this.props.intl;

        const commentsLabel = post.comments.length + ' ' + formatMessage(translations.commentsLabel, {itemCount: post.comments.length});
        const likesLabel = post.likes + ' ' + formatMessage(translations.likesLabel, {itemCount: post.likes});
        const highLightColor = highlighted ? 'darkGray' : 'white';
        const byDisplayName = post.by.name.first + ' ' + post.by.name.last;

        const mediaContent = this.getMediaContent(post);

        return <div ref={this.myRef}>
            <Box color="white"
                 shape="rounded"
                 marginTop={4}
            >
                <Box padding={1}
                     shape="rounded"
                     color={highLightColor}>
                    <Box
                        alignItems="center"
                        direction="row"
                        display="flex"
                        color="white"
                        shape="roundedTop"
                        padding={4}
                        marginBottom={-4}>
                        <Box paddingX={1}>
                            <AttendeeAvatar me={post.by}/>
                        </Box>
                        <Box paddingX={1} flex="grow">
                            <Box direction="row"
                                 display="flex">
                                <Box>
                                    <Text bold>{byDisplayName}</Text>
                                </Box>
                                <Box paddingX={1}>
                                    <Text italic color="darkGray">@{post.by.handle}</Text>
                                </Box>
                            </Box>
                            <Text italic color="gray">
                                <Moment fromNow>{post.when}</Moment>
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        color="white">
                        {mediaContent}
                        <Box padding={4}>
                            <Text>
                                {post.text}
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        direction="row"
                        display="flex"
                        padding={4}
                        marginTop={-4}
                        color="white"
                        shape="roundedBottom">
                        <Button text={likesLabel}
                                inline
                                onClick={() => this._handleLike(post)}
                        />
                        <Button text={commentsLabel}
                                inline
                                onClick={() => this.props.onSelect(post, this.myRef)}/>
                    </Box>
                </Box>
            </Box>
        </div>;
    }
}

PostCard.propTypes = {
    post: PropTypes.arrayOf(PostType).isRequired,
    onSelect: PropTypes.func.isRequired,
    highlighted: PropTypes.bool,
    intl: intlShape.isRequired,
};

PostCard.defaultProps = {
    highlighted: false,
};

export default injectIntl(PostCard);