import React from 'react';
import {Box, IconButton, Text, TextArea} from 'gestalt';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';
import PropTypes from "prop-types";
import {AttendeeType, MessageType} from 'types/Types';
import styled from 'styled-components';
import {intlShape, injectIntl, defineMessages} from 'react-intl';

const translations = defineMessages({
    placeholder: {
        id: 'chat.message.place_holder',
        defaultMessage: 'What would you like to say?',
    },
    sendLabel: {
        id: 'chat.message.send_label',
        defaultMessage: 'Send',
    }
});

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this._handleChange.bind(this);
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this.state = {
            messages: props.messages.reverse(),
            value: '',
        };
        this.me = props.me;
    }

    _handleChange({value}) {
        this.setState({
            value
        });
    }

    _handleNewMessage() {
        const updated = Array.from(this.state.messages);
        updated.unshift({
            id: Math.floor(Math.random() * 1001),
            from: this.me,
            when: new Date(),
            text: this.state.value,
        });
        this.setState({
            messages: updated,
            value: '',
        });
    }

    render() {
        const {messages} = this.state;
        const {formatMessage} = this.props.intl;

        const Container = styled.div`
           display: flex;
           flex-direction: column-reverse;
           flex: <flex-grow>;
           background-color: white;
           overflow: auto;
           padding: 16px;
           height: 100%;
        `;

        return <Box
            direction="column"
            display="flex"
            flex="grow"
            height="100%">
            <Container>
                {messages.map(message => {
                    const myMessage = message.by === this.me;
                    if (myMessage) {
                        return (
                            <Box direction="row"
                                 display="flex"
                                 paddingX={4}
                                 paddingY={2}
                                 justifyContent="end"
                                 key={message.id}
                            >
                                <Box direction="column"
                                     display="flex">
                                    <Box color="blue"
                                         paddingX={4}
                                         paddingY={2}
                                         marginRight={2}
                                         shape="rounded">
                                        <Text color="white">{message.text}</Text>
                                    </Box>
                                </Box>
                                <Box>
                                    <AttendeeAvatar me={message.by}/>
                                </Box>
                            </Box>
                        );
                    } else {
                        return (
                            <Box direction="row"
                                 display="flex"
                                 paddingX={4}
                                 paddingY={2}
                                 justifyContent="start"
                                 key={message.id}
                            >
                                <Box>
                                    <AttendeeAvatar me={message.by}/>
                                </Box>
                                <Box direction="column"
                                     display="flex">
                                    <Box color="lightGray"
                                         paddingX={4}
                                         paddingY={2}
                                         marginLeft={2}
                                         shape="rounded">
                                        <Text color="midnight">{message.text}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    }
                })}
            </Container>
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
                    <AttendeeAvatar me={this.me}/>
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

Chat.propTypes = {
    me: AttendeeType.isRequired,
    messages: PropTypes.arrayOf(MessageType).isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(Chat);