// @flow
import * as React from 'react';
import {Mask} from 'gestalt';
import type {IntLType, MediaImageType} from 'types/Types';
import styled, {css} from 'styled-components';
import {defineMessages, injectIntl} from 'react-intl';

const AvatarContainer = styled.div`
  ${props => props.selected && css`
    border: 4px solid crimson;
    border-radius: 50%;
  `}
`;

const translations = defineMessages({
    alt: {
        id: 'avatar.alt_label',
        defaultMessage: 'Avatar',
    }
});

type AvatarType = {
    id: string,
    image: MediaImageType,
};

type Props = {
    avatar: AvatarType,
    selected?: boolean,
    onClick: Function,
    intl: IntLType,
}

function AvatarChoice(props: Props) {
    const {avatar} = props;
    const {formatMessage} = props.intl;
    return <AvatarContainer
        selected={props.selected}
        onClick={() => {props.onClick(avatar.id)}}
    >
        <Mask
            width={avatar.image.width}
            height={avatar.image.height}
            shape="circle"
        >
            <img
                alt={formatMessage(translations.alt)}
                src={avatar.image.url}
                style={{maxWidth: '100%', display: 'block'}}
            />
        </Mask>
    </AvatarContainer>;
}

AvatarChoice.defaultProps = {
    avatar: {
        image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB',
            width: 70,
            height: 70,
        }
    },
    onClick: () => {
    },
    selected: false,
};

export default injectIntl(AvatarChoice);