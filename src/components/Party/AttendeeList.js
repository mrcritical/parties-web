import React from 'react';
import PropTypes from "prop-types";
import {Box} from 'gestalt';
import {AttendeeType} from 'types/Types';
import Attendee from 'components/Party/Attendee';

class AttendeeList extends React.Component {
    render() {
        const {stylist, host, attendees, me} = this.props;
        return <Box>
            <Attendee me={me}
                      attendee={stylist}
                      presence={stylist.status === 'present'}
                      highlight={true}
            />
            <Attendee me={me}
                      attendee={host}
                      presence={host.status === 'present'}
                      highlight={true}
            />
            {attendees.map(attendee => {
                return <Attendee me={me}
                                 key={attendee.id}
                                 attendee={attendee}
                                 presence={attendee.status === 'present'}/>;
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