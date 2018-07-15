// @flow
import * as React from 'react';
import {Box} from 'gestalt';
import type {AttendeeColorsType, AttendeeType} from 'types/Types';
import Attendee from 'components/Party/Attendee';

type Props = {
    presenter: AttendeeType,
    host: AttendeeType,
    me: AttendeeType,
    attendees: Array<AttendeeType>,
    colors: AttendeeColorsType,
};

function AttendeeList(props: Props) {
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

export default AttendeeList;