import React from 'react';
import {Mask} from 'gestalt';
import {ImageType} from 'types/Types';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const AvatarType = PropTypes.shape({
    image: ImageType.isRequired,
});

const AvatarContainer = styled.div`
  ${props => props.selected && css`
    border: 4px solid crimson;
    border-radius: 50%;
  `}
`;

function AvatarChoice(props) {
    const {avatar} = props;
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
                alt="Avatar"
                src={avatar.image.src}
                style={{maxWidth: '100%', display: 'block'}}
            />
        </Mask>
    </AvatarContainer>;
}

AvatarChoice.propTypes = {
    avatar: AvatarType.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

AvatarChoice.defaultProps = {
    avatar: {
        image: {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB',
            width: 70,
            height: 70,
        }
    },
    onClick: () => {
    },
    selected: false,
};

export default AvatarChoice;