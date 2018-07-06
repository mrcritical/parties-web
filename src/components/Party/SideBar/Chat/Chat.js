import React from 'react';
import {Avatar, Box, Column, Text} from 'gestalt';
import {arrayOf, shape, string} from "prop-types";

const attendeeType = shape({
    id: string.isRequired,
});

class Chat extends React.Component {
    render() {
        const {stylist} = this.props;
        const {host} = this.props;
        const {attendees} = this.props;
        const {display} = this.props;

        const stylistDisplayName = stylist.name.first + ' ' + stylist.name.last;
        const hostDisplayName = host.name.first + ' ' + host.name.last;

        return <Box
                    direction="row"
                    display={display}
                    height="100%">
            <Column span={9}>
                <Box id="chat">
                    <Text>Chat Window</Text>
                </Box>
            </Column>
            <Column span={3}>
                <Box direction="column"
                     display="flex"
                     justifyContent="start"
                     alignItems="stretch"
                     color="lightGray"
                     height="100%">
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        display="flex"
                        color="green"
                        padding="4">
                        <Avatar name={stylistDisplayName} size="md"/>
                    </Box>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        display="flex"
                        color="green"
                        padding="4">
                        <Avatar name={hostDisplayName} size="md"/>
                    </Box>
                    {attendees.map(attendee => {
                        const displayName = attendee.name.first + ' ' + attendee.name.last;
                        return (<Box
                            alignItems="center"
                            justifyContent="center"
                            direction="row"
                            display="flex"
                            padding="4">
                            <Avatar name={displayName} size="md"/>
                        </Box>);
                    })}
                </Box>
            </Column>
        </Box>;
    }
}

Chat.propTypes = {
    stylist: attendeeType.isRequired,
    host: attendeeType.isRequired,
    attendees: arrayOf(attendeeType).isRequired,
    display: string,
};

Chat.defaultProps = {
    stylist: {
        id: '1',
        name: {
            first: 'Stylist',
            last: 'Lastname',
        },
        handle: 'stylist',
    },
    host: {
        id: '2',
        name: {
            first: 'Host',
            last: 'Lastname',
        },
        handle: 'host',
    },
    attendees: [
        {
            id: '3',
            name: {
                first: 'Jane',
                last: 'Doe',
            },
            handle: 'jane.doe',
        },
        {
            id: '4',
            name: {
                first: 'Stacy',
                last: 'Smith',
            },
            handle: 'stacy.smith',
        },
    ],
    display: 'flex',
};

export default Chat;