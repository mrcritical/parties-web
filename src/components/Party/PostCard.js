import React from 'react';
import {Avatar, Box, Button, Image, Text} from 'gestalt';
import Moment from 'react-moment';
import 'moment-timezone';
import {PostType} from "types/Types";
import PropTypes from "prop-types";

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

    render() {
        const {post} = this.state;
        const {highlighted} = this.props;

        const commentsLabel = post.comments.length + ' Comment' + (post.comments.length !== 1 ? 's' : '');
        const likesLabel = post.likes + ' Like' + (post.likes !== 1 ? 's' : '');
        const highLightColor = highlighted ? 'darkGray' : 'white';
        const byDisplayName = post.from.name.first + ' ' + post.from.name.last;

        return <div ref={this.myRef}>
            <Box color="white"
                 shape="rounded"
                 marginBottom={4}
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
                        padding={4}>
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
                        <Box
                            color="darkGray"
                            height={200}
                            width="100%"
                        >
                            <Image src="http://www.nailposse.com/wp-content/uploads/2017/07/Mardi-Gras-Blue-Glitter_slider.jpg"
                                   fit="cover"
                                   alt="Random Image"
                                   naturalHeight={300}
                                   naturalWidth={200}
                            >
                                <Box padding={3}>
                                    <Text color="white">
                                        Cool Image!
                                    </Text>
                                </Box>
                            </Image>
                        </Box>
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