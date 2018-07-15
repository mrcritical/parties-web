import React from 'react';
import {Avatar} from 'gestalt';
import {AttendeeType} from 'types/Types';
import PropTypes from 'prop-types';

function AttendeeAvatar(props) {
    const {me} = props;
    const avatarName = me.name.first + ' ' + me.name.last;
    return <Avatar name={avatarName}
                       size={props.size}
                       src={me.avatar ? me.avatar.url : ''}/>;
}

AttendeeAvatar.propTypes = {
    me: AttendeeType.isRequired,
    size: PropTypes.string,
    presence: PropTypes.bool,
};

AttendeeAvatar.defaultProps = {
    size: 'md',
    presence: false,
};

export default AttendeeAvatar;