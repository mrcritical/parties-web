import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {shape, number, string, arrayOf} from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    root: {
        marginTop: 20,
    },
    list: {
        marginTop: 10,
    },
    selected: {
        opacity: 1,
    },
    unselected: {
        opacity: 0.5,
        '&:hover': {
            opacity: 1
        },
    }
});

const avatarType = shape({
    id: string.isRequired,
    url: string.isRequired,
    width: number.isRequired,
    height: number.isRequired,
});

class AvatarSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAvatar: null
        };
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    selectAvatar(selectedAvatar) {
        this.setState({selectedAvatar});
    }

    render() {
        const {classes} = this.props;
        const {avatars} = this.props;
        const {helperText} = this.props;

        return (
            <div className={classes.root}>
                <Typography color="textSecondary" variant={"caption"} align={"left"}>
                    {helperText}
                </Typography>
                <div className={classes.list}>
                    {avatars.map(avatar => {
                        let avatarClassName = classes.unselected;
                        if (avatar.id === this.state.selectedAvatar) {
                            avatarClassName = classes.selected;
                        }
                        return (
                            <ButtonBase
                                focusRipple
                                key={avatar.id}
                                style={{
                                    width: avatar.width,
                                    height: avatar.height,
                                    marginLeft: 2,
                                    marginRight: 2,
                                }}
                            >
                                <img src={avatar.url}
                                     onClick={() => this.selectAvatar(avatar.id)}
                                     className={avatarClassName}
                                     alt={""}
                                     {...styles.hover}
                                     width={avatar.width}
                                     height={avatar.height}/>
                            </ButtonBase>
                        )
                    })}
                </div>
            </div>
        );
    }
}

AvatarSelector.propTypes = {
    helperText: string,
    avatars: arrayOf(avatarType).isRequired
};

AvatarSelector.defaultProps = {
    helperText: 'Please select an avatar to represent you, visually:',
    avatars: [
        {
            id: '1',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB',
            width: 50,
            height: 50
        },
        {
            id: '2',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBNKVpuJZE0JcC6XD4rhGVgrIGQcBqDZ805aWiRk_EWZXB6cg',
            width: 50,
            height: 50
        },
        {
            id: '3',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShKcascp7Qeo5DeMmvA1HVnJ5dp0HMsRFMgCogQnpCf-A1z9E',
            width: 50,
            height: 50
        },
        {
            id: '4',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3QZAb7zfFhrw7JKUu8hGu6n9e3IFW_R1A74xF_Eav7KNT0iX',
            width: 50,
            height: 50
        }
    ],
};

export default withStyles(styles)(AvatarSelector);