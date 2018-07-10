import React from 'react';
import PropTypes from "prop-types";
import {Avatar, Box, Text} from 'gestalt';
import {AttendeeType} from 'types/Types';

class AttendeeList extends React.Component {
    render() {
        const {stylist} = this.props;
        const {host} = this.props;
        const {attendees} = this.props;
        const {me} = this.props;

        const stylistAvatarName = stylist.name.first + ' ' + stylist.name.last;
        const stylistDisplayName = me.id === stylist.id ? 'Me' : stylistAvatarName;
        const hostAvatarName = host.name.first + ' ' + host.name.last;
        const hostDisplayName = me.id === host.id ? 'Me' : hostAvatarName;

        return <Box>
            <Box
                alignItems="center"
                direction="row"
                display="flex"
                color="green"
                padding={4}>
                <Box paddingX={1}>
                    <Avatar name={stylistAvatarName}
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
                    <Avatar name={hostAvatarName}
                            size="md"
                            verified={host.status === 'present'} />
                </Box>
                <Box paddingX={1} flex="grow">
                    <Text bold color="white">{hostDisplayName}</Text>
                    <Text color="white">@{host.handle}</Text>
                </Box>
            </Box>
            {attendees.map(attendee => {
                const avatarName = attendee.name.first + ' ' + attendee.name.last;
                const displayName = me.id === attendee.id ? 'Me' : avatarName;
                return (<Box
                    alignItems="center"
                    direction="row"
                    display="flex"
                    padding={4}
                    key={attendee.id}
                >
                    <Box paddingX={1}>
                        <Avatar name={avatarName}
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
    me: AttendeeType.isRequired,
    attendees: PropTypes.arrayOf(AttendeeType).isRequired,
};

export default AttendeeList;