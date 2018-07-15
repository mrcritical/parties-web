// @flow
import * as React from 'react';
import {Avatar} from 'gestalt';
import type {AttendeeType} from 'types/Types';

type Size = | 'sm' | 'md' | 'lg';

type Props = {
    me: AttendeeType,
    size: Size,
    presence?: boolean,
};

function AttendeeAvatar(props: Props) {
    const {me} = props;
    const avatarName = me.name.first + ' ' + me.name.last;
    return <Avatar name={avatarName}
                       size={props.size}
                       src={me.avatar ? me.avatar.url : ''}/>;
}

AttendeeAvatar.defaultProps = {
    size: 'md',
    presence: false,
};

export default AttendeeAvatar;