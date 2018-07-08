import React from 'react';
import {Avatar, Box, Button, Column, Heading, IconButton, Image, Tabs, Text} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import styled from 'styled-components';
import AttendeeList from 'components/Party/SideBar/AttendeeList/AttendeeList';
import Chat from 'components/Party/SideBar/Chat/Chat';
import Comments from 'components/Party/SideBar/Comments/Comments';
import Moment from 'react-moment';
import 'moment-timezone';

// All CSS measurements based on 4px * x

const PageHeader = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-color: #5b2677;
  height: 200px;
  padding: 16px;
`;

class PartyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.handleChange = this._handleChange.bind(this);
    }

    componentDidMount() {
        document.title = "Welcome to the Party";
    }

    _handleChange({activeTabIndex, event}) {
        event.preventDefault();
        this.setState({
            activeIndex: activeTabIndex
        });
    }

    render() {
        let content;
        switch (this.state.activeIndex) {
            case 1:
                content = <Chat stylist={stylist}
                                host={host}
                                me={attendee1}
                                messages={messages}/>;
                break;
            case 2:
                // Comments
                content = <Comments me={attendee1}
                                    post={posts[0]}
                                    comments={comments}/>;
                break;
            default:
                content = <AttendeeList stylist={stylist}
                                        host={host}
                                        attendees={[attendee1, attendee2]}/>;
        }

        const post = posts[0];
        const stylistDisplayName = stylist.name.first + ' ' + stylist.name.last;

        return <Box
            direction="row"
            display="flex"
            height="100%"
            wrap
        >
            <Column span={12} mdSpan={8}>
                <Box overflow="auto">
                    <PageHeader>
                        <Box justifyContent="between"
                             alignItems="start"
                             direction="row"
                             display="flex"
                             height="100%">
                            <Box alignItems="center"
                                 direction="row"
                                 display="flex"
                                 height="100%">
                                <Heading size="lg" color="white">
                                    Hello
                                </Heading>
                            </Box>
                            <IconButton
                                accessibilityLabel="Shopping Bag"
                                icon="shopping-bag"
                                iconColor="white"
                            />
                        </Box>
                    </PageHeader>
                    <Box
                        padding={4}>
                        <Box color="white" shape="rounded">
                            <Box
                                alignItems="center"
                                direction="row"
                                display="flex"
                                padding={4}>
                                <Box paddingX={1}>
                                    <Avatar name={stylistDisplayName} size="md"/>
                                </Box>
                                <Box paddingX={1} flex="grow">
                                    <Box direction="row"
                                         display="flex">
                                        <Box>
                                            <Text bold>{stylistDisplayName}</Text>
                                        </Box>
                                        <Box paddingX={1}>
                                            <Text italic color="darkGray">@{stylist.handle}</Text>
                                        </Box>
                                    </Box>
                                    <Text italic color="gray">
                                        <Moment fromNow>{post.when}</Moment>
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    color="darkGray"
                                    height={200}
                                    width="100%"
                                >
                                    <Image src="https://picsum.photos/200/300/?random"
                                           fit="cover"
                                           alt="Random Image"
                                           naturalHeight={300}
                                           naturalWidth={200}
                                    >
                                        <Box padding={3}>
                                            <Text color="white">
                                                Cool Image!
                                            </Text>
                                        </Box>
                                    </Image>
                                </Box>
                                <Box padding={4}>
                                    <Text>
                                        {post.text}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                direction="row"
                                display="flex"
                                padding={4}
                                marginTop={-4}>
                                <Button text="10 Likes" inline/>
                                <Button text="2 Comments" inline/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Column>
            <Column span={12} mdSpan={4}>
                <Box color="white"
                     display="flex"
                     direction="column"
                     height="100%">
                    <Box
                        padding={2}>
                        <Tabs
                            tabs={[
                                {
                                    text: "Attendees",
                                    href: "#"
                                },
                                {
                                    text: "Chat",
                                    href: "#"
                                },
                                {
                                    text: "Comments",
                                    href: "#"
                                }
                            ]}
                            activeTabIndex={this.state.activeIndex}
                            onChange={this.handleChange}
                        />
                    </Box>
                    {content}
                </Box>
            </Column>
        </Box>;
    }
}

// =====================
// Test data
// =====================
const stylist = {
    id: '1',
    name: {
        first: 'Stylist',
        last: 'Lastname',
    },
    handle: 'stylist',
};

const host = {
    id: '2',
    name: {
        first: 'Host',
        last: 'Lastname',
    },
    handle: 'host',
};

const attendee1 = {
    id: '3',
    name: {
        first: 'Jane',
        last: 'Doe',
    },
    handle: 'jane.doe',
};

const attendee2 = {
    id: '4',
    name: {
        first: 'Stacy',
        last: 'Smith',
    },
    handle: 'stacy.smith',
};

const messages = [
    {
        id: '1',
        from: attendee1,
        when: '2018-07-06T18:01:00-0500',
        text: 'This product is cool. I want to buy it!'
    },
    {
        id: '2',
        from: stylist,
        when: '2018-07-06T18:02:00-0500',
        text: 'Ok. How many?'
    },
    {
        id: '3',
        from: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: '3'
    },
    {
        id: '4',
        from: stylist,
        when: new Date(),
        text: 'Done.'
    },
    {
        id: '4',
        from: stylist,
        when: '2018-07-06T18:03:00-0500',
        text: 'I now want to test a much longer message to see if it works and how wraps. Does this look ok? I hope so. If not you should fix it.'
    },
];

const posts = [
    {
        id: '1',
        from: stylist,
        when: '2018-07-06T18:01:00-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum, lacus vel convallis dictum, orci lectus rutrum purus, vel tincidunt nisi nunc nec nisi. Vestibulum auctor urna sed elementum cursus. Suspendisse nec pellentesque urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        likes: 2
    }
];

const comments = [
    {
        id: '1',
        from: attendee1,
        when: '2018-07-06T18:01:00-0500',
        text: 'Praesent eu sodales turpis, at molestie nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        likes: 2,
    },
    {
        id: '2',
        from: stylist,
        when: '2018-07-06T18:02:00-0500',
        text: 'Cras maximus, justo ut aliquam vestibulum, nunc lacus efficitur quam, vel malesuada leo dui in urna.'
    },
    {
        id: '3',
        from: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '4',
        from: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '5',
        from: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '6',
        from: host,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '7',
        from: host,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
];

export default PartyPage;