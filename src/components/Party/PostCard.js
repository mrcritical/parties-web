// @flow
import * as React from 'react';
import {Box, Button, Image, Text} from 'gestalt';
import Moment from 'react-moment';
import 'moment-timezone';
import type {IntLType, PostType} from "types/Types";
import ReactPlayer from 'react-player';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';
import {defineMessages, injectIntl} from 'react-intl';

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
    catalogActionButton: {
        id: 'post.actions.catalog',
        defaultMessage: 'View Catalog',
    },
});

type AvailableActionType = {
    name: string,
    action: Function,
}

type Props = {
    post: PostType,
    onSelect: Function,
    onLike: Function,
    highlighted?: boolean,
    availableActions?: Array<AvailableActionType>,
    intl: IntLType,
};

class PostCard extends React.Component<Props> {

    static defaultProps = {
        highlighted: false,
    };

    myRef = React.createRef();

    _handleLike: (post : PostType) => void = (post) => {
        this.props.onLike(post);
    };

    getMediaContent(post) {
        const {formatMessage} = this.props.intl;
        if (post.image) {
            return <Box
                color="white"
                height={post.image && post.image.height ? post.image.height : 200}
                width="100%"
                marginTop={-4}
                padding={4}
            >
                <Image src={post.image.url}
                       fit="cover"
                       alt={post.image.caption ? post.image.caption : formatMessage(translations.defaultImageCaption)}
                       naturalWidth={post.image && post.image.width ? post.image.width : 0}
                       naturalHeight={post.image && post.image.height ? post.image.height : 0}
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
                padding={4}
                marginBottom={4}
            >
                <Box flex="grow"
                     direction="column"
                     display="flex"
                     justifyContent="center"
                >
                    <ReactPlayer url={post.video.url}
                                 width={post.video && post.video.width ? post.video.width : 640}
                                 height={post.video && post.video.height ? post.video.height : 360}
                                 controls/>
                </Box>
            </Box>;
        } else {
            return null;
        }
    }

    getActions(post) {
        const {formatMessage} = this.props.intl;
        const {availableActions} = this.props;
        if (post.actions) {
            return <Box padding={2}
                        marginTop={-4}
                        direction="row"
                        display="flex"
                        justifyContent="start"
                        alignItems="center">
                {post.actions.map((action) => {
                    switch (action.trigger) {
                        case 'catalog':
                            const match = availableActions ? availableActions.find((availableAction) => availableAction.name === action.trigger) : null;
                            if (match) {
                                const openCatalog = match.action;
                                return <Box padding={2} flex="grow">
                                    <Button
                                        text={formatMessage(translations.catalogActionButton)}
                                        accessibilityLabel={formatMessage(translations.catalogActionButton)}
                                        color="blue"
                                        size="lg"
                                        onClick={() => {
                                            openCatalog();
                                        }}
                                    />
                                </Box>;
                            } else {
                                return null;
                            }

                        default:
                            // Unknown trigger
                            return null;
                    }
                })}
            </Box>;
        } else {
            return null;
        }
    }

    render() {
        const {post} = this.props;
        const {highlighted} = this.props;
        const {formatMessage} = this.props.intl;

        const commentsLabel = (post.comments ? post.comments.length : 0) + ' ' + formatMessage(translations.commentsLabel, {itemCount: post.comments ? post.comments.length : 0});
        const likesLabel = (post.likes ? post.likes : 0) + ' ' + formatMessage(translations.likesLabel, {itemCount: post.likes ? post.likes : 0});
        const highLightColor = highlighted ? 'darkGray' : 'white';
        const byDisplayName = post.by.name.first + ' ' + post.by.name.last;

        const mediaContent = this.getMediaContent(post);
        const actions = this.getActions(post);

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
                        <Box padding={4}>
                            <Text size="lg">
                                {post.text}
                            </Text>
                        </Box>
                        {mediaContent}
                        {actions}
                    </Box>
                    <Box
                        direction="row"
                        display="flex"
                        padding={4}
                        marginTop={-4}
                        color="white"
                        shape="roundedBottom">
                        <Box>
                            <Button text={likesLabel}
                                    inline
                                    onClick={() => this._handleLike(post)}
                            />
                        </Box>
                        <Box paddingX={2}>
                            <Button text={commentsLabel}
                                    inline
                                    onClick={() => this.props.onSelect(post, this.myRef)}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>;
    }
}

export default injectIntl(PostCard);