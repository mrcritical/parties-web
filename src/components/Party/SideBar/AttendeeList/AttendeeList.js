import React from 'react';
import {arrayOf, shape, string} from "prop-types";
import {Avatar, Box, Text} from 'gestalt';

const attendeeType = shape({
    id: string.isRequired,
});

class AttendeeList extends React.Component {
    render() {
        const {stylist} = this.props;
        const {host} = this.props;
        const {attendees} = this.props;
        const {display} = this.props;

        const stylistDisplayName = stylist.name.first + ' ' + stylist.name.last;
        const hostDisplayName = host.name.first + ' ' + host.name.last;

        return <Box
            display={display}>
            <Box
                alignItems="center"
                direction="row"
                display="flex"
                color="green"
                padding="4">
                <Box paddingX={1}>
                    <Avatar name={stylistDisplayName} size="md" />
                </Box>
                <Box paddingX={1} flex="grow">
                    <Text bold color="white">{stylistDisplayName}</Text>
                    <Text color="white">@{stylist.handle}</Text>
                </Box>
            </Box>
            <Box
                alignItems="center"
                direction="row"
                display="flex"
                color="green"
                padding="4">
                <Box paddingX={1}>
                    <Avatar name={hostDisplayName} size="md" />
                </Box>
                <Box paddingX={1} flex="grow">
                    <Text bold color="white">{hostDisplayName}</Text>
                    <Text color="white">@{host.handle}</Text>
                </Box>
            </Box>
            {attendees.map(attendee => {
                const displayName = attendee.name.first + ' ' + attendee.name.last;
                return (<Box
                    alignItems="center"
                    direction="row"
                    display="flex"
                    padding="4">
                    <Box paddingX={1}>
                        <Avatar name={displayName} size="md"/>
                    </Box>
                    <Box paddingX={1} flex="grow">
                        <Text bold>{displayName}</Text>
                        <Text>@{attendee.handle}</Text>
                    </Box>
                </Box>);
            })}
        </Box>;
    }
}

AttendeeList.propTypes = {
    stylist: attendeeType.isRequired,
    host: attendeeType.isRequired,
    attendees: arrayOf(attendeeType).isRequired,
    display: string,
};

AttendeeList.defaultProps = {
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
    display: 'block',
};

export default AttendeeList;