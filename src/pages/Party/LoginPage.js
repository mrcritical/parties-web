import React from 'react';
import {Box, Button, Heading, Text, TextField} from 'gestalt';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from "react-intl";
import AvatarChoice from 'components/Party/Login/AvatarChoice';
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import styled, {css} from 'styled-components';
import md5 from 'md5';

const translations = defineMessages({
    title: {
        id: 'login.title',
        defaultMessage: 'Customize Your Profile',
    },
    chooseHandleLabel: {
        id: 'login.choose_handle_label',
        defaultMessage: 'Choose your handle',
    },
    chooseHandleDescription: {
        id: 'login.choose_handle_description',
        defaultMessage: 'It allows others to refer to you in their comments',
    },
    chooseAvatarLabel: {
        id: 'login.choose_avatar_label',
        defaultMessage: 'Choose your avatar',
    },
    chooseAvatarDescription: {
        id: 'login.choose_avatar_description',
        defaultMessage: 'It helps others quickly spot your comments among others',
    },
    joinButton: {
        id: 'login.join_button',
        defaultMessage: 'Join the Party',
    },
});

const FullPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.color};
    ${props => props.image && css`
      background-image: url(${props => props.image});
      background-size: cover;
    `}
`;

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.defaultAvatarId = Math.floor(Math.random() * 1000);
        this.state = {
            selectedAvatar: this.defaultAvatarId,
            handleValue: me.name.first + '.' + me.name.last,
            handleErrorMessage: null,
        };
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onAvatarChange(id) {
        this.setState({
            selectedAvatar: id,
        });
    }

    onHandleChange({value}) {
        this.setState({
            handleValue: value.trim(),
            handleErrorMessage: null,
        });

        if (value === null || value.length === 0) {
            this.setState({
                handleErrorMessage: "This field can't be blank!"
            });
            return;

        } else if (value.length > 30) {
            this.setState({
                handleErrorMessage: "Must be 30 characters or less"
            });
            return;
        }

        const match = attendees.findIndex((attendee) => {
            return attendee.handle.toLowerCase() === value.trim().toLowerCase()
        });
        if (match >= 0) {
            this.setState({
                handleErrorMessage: "Handle already taken"
            });
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {selectedAvatar} = this.state;

        return <FullPageContainer image={party.settings.welcome.background.image ? party.settings.welcome.background.image.url : null}
                                  color={party.settings.welcome.background.color}
        >
            <Box direction="row"
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 height="100%"
            >
                <Box
                    maxWidth={400}
                    minHeight={500}
                    color="white"
                    shape="rounded"
                    padding={6}
                    direction="column"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box flex="grow"
                         width="100%"
                         padding={4}
                    >
                        <Box
                            direction="column"
                            display="flex"
                            alignItems="center"
                            justifyContent="center">
                            <Heading
                                size="sm">
                                <FormattedMessage id={translations.title.id}
                                                  defaultMessage={translations.title.defaultMessage}
                                />
                            </Heading>
                        </Box>
                        <Box
                            direction="column"
                            display="flex"
                            alignItems="stretch"
                            justifyContent="center"
                            paddingY={2}
                            marginTop={6}
                        >
                            <Box marginBottom={4}>
                                <Text size="lg" align="center">
                                    <FormattedMessage id={translations.chooseHandleLabel.id}
                                                      defaultMessage={translations.chooseHandleLabel.defaultMessage}
                                    />
                                </Text>
                                <Text size="md"
                                      align="center"
                                      color="gray"
                                      italic
                                >
                                    <FormattedMessage id={translations.chooseHandleDescription.id}
                                                      defaultMessage={translations.chooseHandleDescription.defaultMessage}
                                    />
                                </Text>
                            </Box>
                            <Box
                                direction="row"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Box paddingX={2}>
                                    <Text bold
                                          size="xl"
                                    >
                                        @
                                    </Text>
                                </Box>
                                <Box>
                                    <TextField
                                        id="handle"
                                        placeholder={formatMessage(translations.chooseHandleLabel)}
                                        value={this.state.handleValue}
                                        errorMessage={this.state.handleErrorMessage}
                                        onChange={this.onHandleChange}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            direction="column"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            paddingY={2}>
                            <Text size="lg">
                                <FormattedMessage id={translations.chooseAvatarLabel.id}
                                                  defaultMessage={translations.chooseAvatarLabel.defaultMessage}
                                />
                            </Text>
                            <Text size="md"
                                  align="center"
                                  color="gray"
                                  italic
                            >
                                <FormattedMessage id={translations.chooseAvatarDescription.id}
                                                  defaultMessage={translations.chooseAvatarDescription.defaultMessage}
                                />
                            </Text>
                        </Box>
                        <Box
                            direction="row"
                            display="flex"
                            justifyContent="around"
                            alignItems="center"
                            paddingY={2}
                        >
                            <AvatarChoice avatar={{
                                id: this.defaultAvatarId,
                                image: {
                                    url: 'https://www.gravatar.com/avatar/' + md5(me.email) + '?s=50&d=identicon',
                                    width: 50,
                                    height: 50
                                }
                            }}
                                          selected={this.defaultAvatarId === selectedAvatar}
                                          onClick={this.onAvatarChange}/>
                            {avatars.map((avatar) => {
                                return <AvatarChoice avatar={avatar}
                                                     selected={avatar.id === selectedAvatar}
                                                     onClick={this.onAvatarChange}/>
                            })}
                        </Box>
                        <Box
                            direction="row"
                            display="flex"
                            justifyContent="center"
                            alignItems="start"
                            flex="grow"
                            marginTop={6}
                            paddingY={2}
                        >
                            <Button
                                text={formatMessage(translations.joinButton)}
                                color="red"
                                disabled={this.state.handleErrorMessage !== null}
                                onClick={() => {
                                    this.props.history.push('/parties/' + this.props.partyId);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </FullPageContainer>;
    }
}

LoginPage.propTypes = {
    intl: intlShape.isRequired,
};

const party = {
    settings: {
        welcome: {
            background: {
                // image: {
                //     url: 'https://colorstreet.com/wp-content/uploads/2017/11/2-24-17-Incoco-ColorStreet.jpg',
                // },
                color: 'purple',
            }
        },
    }
};

const me = {
    email: 'guest@gmail.com',
    name: {
        first: 'Jane',
        last: 'Friend',
    },
};

const attendees = [
    {
        handle: 'stylist',
    },
    {
        handle: 'host',
    },
    {
        handle: 'jane.doe',
    },
    {
        handle: 'stacy.smith',
    }
];

const avatars = [
    {
        id: '1',
        image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB',
            width: 50,
            height: 50
        }
    },
    {
        id: '2',
        image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBNKVpuJZE0JcC6XD4rhGVgrIGQcBqDZ805aWiRk_EWZXB6cg',
            width: 50,
            height: 50
        }
    },
    {
        id: '3',
        image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShKcascp7Qeo5DeMmvA1HVnJ5dp0HMsRFMgCogQnpCf-A1z9E',
            width: 50,
            height: 50
        }
    },
    {
        id: '4',
        image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3QZAb7zfFhrw7JKUu8hGu6n9e3IFW_R1A74xF_Eav7KNT0iX',
            width: 50,
            height: 50
        }
    },
];

export default compose(
    withRouter,
    injectIntl
)(LoginPage);