import React from 'react';
import {Box, Text} from 'gestalt';
import {AttendeeType, AttendeeColorsType} from 'types/Types';
import PropTypes from 'prop-types';
import AttendeeAvatar from 'components/Party/AttendeeAvatar';

class Attendee extends React.Component {

    render() {
        const {me, attendee, highlight, presence, colors} = this.props;
        const displayName = me.id === attendee.id ? 'Me' : attendee.name.first + ' ' + attendee.name.last;
        return <Box
            alignItems="center"
            direction="row"
            display="flex"
            padding={4}
            color={highlight ? colors.background : 'white'}
            key={attendee.id}
        >
            <Box paddingX={1}>
                <AttendeeAvatar me={attendee}
                                presence={presence}/>
            </Box>
            <Box paddingX={1} flex="grow">
                <Text bold
                      color={highlight ? presence ? colors.online : colors.offline : presence ? 'darkGray' : 'lightGray'}>
                    {displayName}
                </Text>
                <Text
                    color={highlight ? presence ? colors.online : colors.offline :  presence ? 'darkGray' : 'lightGray'}>
                    @{attendee.handle}
                </Text>
            </Box>
        </Box>;
    }
}

Attendee.propTypes = {
    me: AttendeeType.isRequired,
    attendee: AttendeeType.isRequired,
    size: PropTypes.string,
    presence: PropTypes.bool,
    highlight: PropTypes.bool,
    colors: AttendeeColorsType,
};

Attendee.defaultProps = {
    size: 'md',
    presence: false,
    highlight: false,
    colors: {
        background: 'green',
        online: 'white',
        offline: 'pine',
    }
};

export default Attendee;