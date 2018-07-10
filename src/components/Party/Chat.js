import React from 'react';
import {Avatar, Box, IconButton, Text, TextArea} from 'gestalt';
import PropTypes from "prop-types";
import {AttendeeType, MessageType} from 'types/Types';
import styled from 'styled-components';

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
                    const myMessage = message.from === this.me;
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
                                    <Avatar name={message.from.name.first + ' ' + message.from.name.last}
                                            size="md"/>
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
                                    <Avatar name={message.from.name.first + ' ' + message.from.name.last}
                                            size="md"/>
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

Chat.propTypes = {
    me: AttendeeType.isRequired,
    messages: PropTypes.arrayOf(MessageType).isRequired,
};

export default Chat;