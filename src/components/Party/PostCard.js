import React from 'react';
import {Avatar, Box, Button, Image, Text} from 'gestalt';
import Moment from 'react-moment';
import 'moment-timezone';
import {PostType} from "types/Types";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';

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

    static getMediaContent(post) {
        if (post.image) {
            return <Box
                color="darkGray"
                height={200}
                width="100%"
                marginTop={4}
            >
                <Image src={post.image.src}
                       fit="cover"
                       alt="Random Image"
                       naturalHeight={300}
                       naturalWidth={200}
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

        const commentsLabel = post.comments.length + ' Comment' + (post.comments.length !== 1 ? 's' : '');
        const likesLabel = post.likes + ' Like' + (post.likes !== 1 ? 's' : '');
        const highLightColor = highlighted ? 'darkGray' : 'white';
        const byDisplayName = post.from.name.first + ' ' + post.from.name.last;

        const mediaContent = PostCard.getMediaContent(post);

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
                            <Avatar name={byDisplayName} size="md"/>
                        </Box>
                        <Box paddingX={1} flex="grow">
                            <Box direction="row"
                                 display="flex">
                                <Box>
                                    <Text bold>{byDisplayName}</Text>
                                </Box>
                                <Box paddingX={1}>
                                    <Text italic color="darkGray">@{post.from.handle}</Text>
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
};

PostCard.defaultProps = {
    highlighted: false,
};

export default PostCard;