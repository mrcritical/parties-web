// @flow
import * as React from 'react';
import {Box, IconButton, Text, TextArea} from 'gestalt';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';
import type {AttendeeType, IntLType, MessageType} from 'types/Types';
import styled from 'styled-components';
import {defineMessages, injectIntl} from 'react-intl';

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

type Props = {
    me: AttendeeType,
    messages: Array<MessageType>,
    onNewMessage: Function,
    intl: IntLType,
};

type State = {
    value: string,
};

class Chat extends React.Component<Props, State> {

    state = {
        value: '',
    };

    handleChange: ({ event: SyntheticInputEvent<>, value: string }) => void = ({value}) => {
        this.setState({
            value
        });
    };

    handleNewMessage: () => void = () => {
        const {me} = this.props;

        // Only add a message if there is something there
        if(this.state.value && this.state.value.length > 0) {
            this.props.onNewMessage({
                id: Math.floor(Math.random() * 1001),
                by: me,
                when: new Date(),
                text: this.state.value,
            });
            this.setState({
                value: '',
            });
        }
    };

    render() {
        const {messages} = this.props;
        const {me} = this.props;
        const {formatMessage} = this.props.intl;

        const Container = styled.div`
           display: flex;
           -ms-flex-direction: column-reverse;
           flex-direction: column-reverse;
           background-color: white;
           overflow: auto;
           -ms-flex: 1 1 auto;
           flex: 1 1 auto;
           min-height: 0;
           min-width: 0;
           padding: 16px;
           height: 100%;
           box-sizing: border-box;
        `;

        return <Box
            direction="column"
            display="flex"
            flex="grow"
            height="100%">
            <Container>
                {messages.map(message => {
                    const myMessage = message.by === me;
                    if (myMessage) {
                        return (
                            <Box direction="row"
                                 display="flex"
                                 paddingX={4}
                                 paddingY={2}
                                 justifyContent="end"
                                 flex="none"
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
                                 flex="none"
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
                    <AttendeeAvatar me={me}/>
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
                        onClick={this.handleNewMessage}
                    />
                </Box>
            </Box>
        </Box>;
    }
}

export default injectIntl(Chat);