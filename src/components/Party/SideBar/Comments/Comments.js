import React from 'react';
import {Avatar, Box, Divider, IconButton, Text, TextArea} from 'gestalt';
import PropTypes from "prop-types";
import {AttendeeType, PostType} from 'types/Types';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this._handleChange.bind(this);
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this.me = props.me;
        this.state = {
            comments: props.post.comments,
            value: '',
        };
        this.messagesEnd = null;
    }

    scrollToBottom() {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
        }
    }

    componentDidUpdate(prepProps, prevState, snapshot) {
        this.scrollToBottom();
    }

    _handleChange({value}) {
        this.setState({
            value
        });
    }

    _handleNewMessage() {
        const comment = {
            id: Math.floor(Math.random() * 1001),
            from: this.me,
            when: new Date(),
            text: this.state.value,
        };
        const updated = this.state.comments.concat(comment);
        this.setState({
            comments: updated,
            value: '',
        });
        // Inform the parent that this post has a new comment
        this.props.onComment(this.props.post.id, comment);
    }

    render() {
        const {comments} = this.state;
        const {post} = this.props;
        const displayPostByName = post.from.name.first + ' ' + post.from.name.last;
        const now = moment();

        return <Box
            direction="column"
            display="flex"
            flex="grow">
            <Box direction="row"
                 display="flex"
                 padding={4}
                 color="lightGray"
                 flex="none">
                <Box>
                    <Avatar name={displayPostByName}
                            size="lg"/>
                </Box>
                <Box direction="column"
                     display="flex"
                     padding={2}>
                    <Box>
                        <Box direction="row"
                             display="flex">
                            <Box>
                                <Text bold>{displayPostByName}</Text>
                            </Box>
                            <Box paddingX={1}>
                                <Text italic color="darkGray">@{post.from.handle}</Text>
                            </Box>
                        </Box>
                        <Text italic
                              color="gray">
                            <Moment fromNow>{post.when}</Moment>
                        </Text>
                    </Box>
                    <Box marginTop={2}>
                        <Text size="lg">
                            {post.text}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Divider/>
            <Box display="flex"
                 direction="column"
                 flex="grow"
                 overflow="auto">
                {comments.map(comment => {
                    const minutes = moment
                        .duration(now
                            .diff(moment(comment.when))
                        )
                        .asMinutes();

                    let momentsAgo;
                    // Only show when if more then 5 minutes ago
                    if (minutes >= 5) {
                        momentsAgo = <Box>
                            <Text italic color="gray">
                                <Moment fromNow>{comment.when}</Moment>
                            </Text>
                        </Box>;
                    }

                    return (
                        <Box key={comment.id}>
                            <Box direction="row"
                                 display="flex"
                                 paddingX={4}
                                 paddingY={2}
                                 justifyContent="start">
                                <Box>
                                    <Avatar name={comment.from.name.first + ' ' + comment.from.name.last}
                                            size="md"/>
                                </Box>
                                <Box direction="row"
                                     display="flex"
                                     paddingX={4}
                                     paddingY={2}>
                                    <Box>
                                        <Box direction="row"
                                             display="flex">
                                            <Box>
                                                <Text
                                                    bold>{comment.from.name.first + ' ' + comment.from.name.last}</Text>
                                            </Box>
                                            <Box paddingX={1}>
                                                <Text italic color="darkGray">@{comment.from.handle}</Text>
                                            </Box>
                                        </Box>
                                        <Box paddingY={2}>
                                            <Text>{comment.text}</Text>
                                        </Box>
                                        {momentsAgo}
                                    </Box>
                                </Box>
                            </Box>
                            <Divider/>
                        </Box>
                    );
                })}
                <div style={{float: "left", clear: "both"}}
                     ref={(el) => {
                         this.messagesEnd = el;
                     }}>
                </div>
            </Box>
            <Box
                direction="row"
                display="flex"
                justifyContent="between"
                alignItems="center"
                paddingY={10}
                height={40}
                flex="none"
            >
                <Box
                    paddingX={4}>
                    <Avatar name={this.me.name.first + ' ' + this.me.name.last} size="md"/>
                </Box>
                <Box width="100%">
                    <TextArea
                        id="comment"
                        placeholder="What would you like to say?"
                        rows={1}
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </Box>
                <Box
                    paddingX={2}>
                    <IconButton
                        accessibilityLabel="Send"
                        icon="send"
                        iconColor="gray"
                        size="lg"
                        onClick={this._handleNewMessage}
                    />
                </Box>
            </Box>
        </Box>;
    }
}

Comments.propTypes = {
    me: AttendeeType.isRequired,
    post: PostType.isRequired,
    onComment: PropTypes.func.isRequired,
};

export default Comments;