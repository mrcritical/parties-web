import React from 'react';
import PropTypes from "prop-types";
import {Box} from 'gestalt';
import {AttendeeColorsType, AttendeeType} from 'types/Types';
import Attendee from 'components/Party/Attendee';

function AttendeeList(props) {
    const {presenter, host, attendees, me, colors} = props;
    return <Box>
            <Attendee me={me}
                      attendee={presenter}
                      presence={presenter.status === 'present'}
                      highlight={true}
                      colors={colors}
            />
            <Attendee me={me}
                      attendee={host}
                      presence={host.status === 'present'}
                      highlight={true}
                      colors={colors}
            />
            {attendees.map(attendee => {
                return <Attendee me={me}
                                 key={attendee.id}
                                 attendee={attendee}
                                 presence={attendee.status === 'present'}/>;
            })}
    </Box>;
}

AttendeeList.propTypes = {
    presenter: AttendeeType.isRequired,
    host: AttendeeType.isRequired,
    me: AttendeeType.isRequired,
    attendees: PropTypes.arrayOf(AttendeeType).isRequired,
    colors: AttendeeColorsType,
};

export default AttendeeList;