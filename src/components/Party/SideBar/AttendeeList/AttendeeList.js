import React from 'react';
import PropTypes from "prop-types";
import {Avatar, Box, Text} from 'gestalt';
import {AttendeeType} from 'types/Types';

class AttendeeList extends React.Component {
    render() {
        const {stylist} = this.props;
        const {host} = this.props;
        const {attendees} = this.props;

        const stylistDisplayName = stylist.name.first + ' ' + stylist.name.last;
        const hostDisplayName = host.name.first + ' ' + host.name.last;

        return <Box>
            <Box
                alignItems="center"
                direction="row"
                display="flex"
                color="green"
                padding={4}>
                <Box paddingX={1}>
                    <Avatar name={stylistDisplayName}
                            size="md"
                            verified={stylist.status === 'present'} />
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
                padding={4}>
                <Box paddingX={1}>
                    <Avatar name={hostDisplayName}
                            size="md"
                            verified={host.status === 'present'} />
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
                    padding={4}
                    key={attendee.id}
                >
                    <Box paddingX={1}>
                        <Avatar name={displayName}
                                size="md"
                                verified={attendee.status === 'present'}/>
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
    stylist: AttendeeType.isRequired,
    host: AttendeeType.isRequired,
    attendees: PropTypes.arrayOf(AttendeeType).isRequired,
};

export default AttendeeList;