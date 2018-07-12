import React from 'react';
import {Avatar} from 'gestalt';
import {AttendeeType} from 'types/Types';
import PropTypes from 'prop-types';

class AttendeeAvatar extends React.Component {

    render() {
        const {me} = this.props;
        const avatarName = me.name.first + ' ' + me.name.last;
        return <Avatar name={avatarName}
                       size={this.props.size}
                       src={me.avatar ? me.avatar.src : ''}/>;
    }
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