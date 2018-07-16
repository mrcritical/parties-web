// @flow
import * as React from 'react';
import {Box, Text} from 'gestalt';
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import type {IntLType} from 'types/Types';
import * as moment from 'moment';

const translations = defineMessages({
    title: {
        id: 'admin.party.title',
        defaultMessage: 'Hello',
    }
});

type Props = {
    intl: IntLType,
};

class PartyPage extends React.Component<Props> {
    render() {
        return <Box direction="row"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%">
            <Text>
                <FormattedMessage id={translations.title.id}
                                  defaultMessage={translations.title.defaultMessage}/>
            </Text>
        </Box>;
    }
}

const party = {
    id: '',
    name: '',
    when: {
        created: new Date(),
        plannedStart: new Date(),
        actualStart: new Date(),
        ended: moment().add(2, 'days').toDate(),
        closed: new Date(),
    },
    autoStart: false, // Start automatically at plannedStart date/time (or wait to be manually started)
    status: '', // created, started, ended, closed
    presenters: [
        {
            id: '',
            name: {
                first: '',
                last: '',
            },
            handle: '',
            avatar: {
                image: {
                    src: ''
                }
            }
        }
    ],
    hosts: [
        {
            id: '',
            name: {
                first: '',
                last: '',
            },
            handle: '',
            avatar: {
                image: {
                    src: ''
                }
            }
        }
    ],
    guests: [
        {
            id: '',
            name: {
                first: '',
                last: '',
            },
            handle: '',
            avatar: {
                image: {
                    src: ''
                }
            },
            status: '', // invited, attended, declined, present, no-show
        }
    ],
    posts: [
        {
            id: '',
            by: {},
            when: new Date(),
            text: '',
            media: [
                {
                    type: '', // image, video
                    url: '',
                    source: '', // 'youtube','facebook','soundcloud','vimeo','mp4'
                    width: '',
                    height: '',
                    caption: '',
                }
            ],
            likes: 0,
            comments: [
                {
                    id: '',
                    by: {},
                    when: new Date(),
                    text: '',
                }
            ],
            actions: [
                {
                    trigger: 'catalog', // catalog
                }
            ]
        }
    ],
    chats: [
        {
            participants: [
                {
                    id: '',
                }
            ],
            messages: [
                {
                    id: '',
                    by: {},
                    when: new Date(),
                    text: '',
                }
            ]
        }
    ],
    plans: [
        {
            id: '',
            minutesFromStart: 0, // minutes relative to start date/time,
            action: {
                type: 'post', // post today, who knows in the future
                by: {},
                text: '',
                media: [
                    {
                        type: '', // image, video
                        url: '',
                        source: '',
                        width: '',
                        height: '',
                        caption: '',
                    }
                ]
            },
        }
    ],
    catalog: {
        id: '',
        currency: 'USD',
        categories: [
            {
                id: '',
                name: '',
            }
        ],
        products: [
            {
                id: '',
                name: '',
                cost: 0,
                qualifier: '', // each, set, etc.
                media: [
                    {
                        type: 'image',
                        url: '',
                        width: 0,
                        height: 0,
                    }
                ],
                tags: [
                    ''
                ]
            }
        ]
    },
    orders: [
        {
            id: '',
            by: {},
            items: [
                {
                    id: '',
                    name: '',
                    quantity: 0,
                    total: 0.00
                }
            ],
            total: 0.00
        }
    ],
    settings: {
        welcome: {
            background: {
                image: {
                    src: 'https://colorstreet.com/wp-content/uploads/2017/11/2-24-17-Incoco-ColorStreet.jpg',
                },
                color: 'purple',
            }
        },
        header: {
            image: '',
            colors: {
                text: 'white',
                background: '#5b2677',
                contrast: true,
                bag: 'white',
            },
        },
        attendees: {
            attendees: {
                highlight: {
                    background: 'green',
                    online: 'white',
                    offline: 'pine',
                }
            }
        }
    },
};

export default injectIntl(PartyPage);