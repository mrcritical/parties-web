// @flow
import * as React from 'react';
import {Box, Divider, IconButton, Text, TextArea} from 'gestalt';
import type {AttendeeType, IntLType, PostType} from 'types/Types';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import {defineMessages, injectIntl} from 'react-intl';

const translations = defineMessages({
    placeholder: {
        id: 'comments.message.place_holder',
        defaultMessage: 'What would you like to say?',
    },
    sendLabel: {
        id: 'comments.message.send_label',
        defaultMessage: 'Send',
    }
});

type Props = {
    me: AttendeeType,
    post: PostType,
    onComment: Function,
    intl: IntLType,
};

type State = {
    value: string,
};

class Comments extends React.Component<Props, State> {

    messagesEnd = null;

    state = {
      value: '',
    };

    scrollToBottom() {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
        }
    }

    componentDidUpdate(prepProps, prevState, snapshot) {
        this.scrollToBottom();
    }

    handleChange: ({ event: SyntheticInputEvent<>, value: string }) => void = ({value}) => {
        this.setState({
            value
        });
    };

    _handleNewMessage: () => void = () => {
        const {me} = this.props;
        this.setState({
            value: '',
        });
        // Inform the parent that this post has a new comment
        this.props.onComment(this.props.post.id, {
            id: Math.floor(Math.random() * 1001),
            by: me,
            when: new Date(),
            text: this.state.value,
        });
    };

    render() {
        const {post, me} = this.props;
        const {comments} = this.props.post;
        const displayPostByName = post.by.name.first + ' ' + post.by.name.last;
        const now = moment();
        const {formatMessage} = this.props.intl;

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
                    <AttendeeAvatar me={post.by}
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
                                <Text italic color="darkGray">@{post.by.handle}</Text>
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
                {comments && comments.map(comment => {
                    const minutes = moment
                        .duration(now
                            .diff(moment(comment.when))
                        )
                        .asMinutes();

                    let momentsAgo;
                    // Only show when if more then 5 minutes ago
                    if (minutes >= 5) {
                        momentsAgo = <Box marginTop={2}>
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
                                    <AttendeeAvatar me={comment.by} />
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
                                                    bold>{me.id === comment.by.id ? 'Me' : comment.by.name.first + ' ' + comment.by.name.last}</Text>
                                            </Box>
                                            <Box paddingX={1}>
                                                <Text italic color="darkGray">@{comment.by.handle}</Text>
                                            </Box>
                                        </Box>
                                        <Box marginTop={2}>
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
                    <AttendeeAvatar me={me} />
                </Box>
                <Box width="100%">
                    <TextArea
                        id="comment"
                        placeholder={formatMessage(translations.placeholder)}
                        rows={1}
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </Box>
                <Box
                    paddingX={2}>
                    <IconButton
                        accessibilityLabel={formatMessage(translations.sendLabel)}
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

export default injectIntl(Comments);