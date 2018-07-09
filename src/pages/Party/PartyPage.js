import React from 'react';
import {Box, Column, Heading, IconButton, Tabs} from 'gestalt';
import styled from 'styled-components';
import AttendeeList from 'components/Party/SideBar/AttendeeList/AttendeeList';
import Chat from 'components/Party/SideBar/Chat/Chat';
import Comments from 'components/Party/SideBar/Comments/Comments';
import PostCard from "components/Party/Posts/Card/PostCard";

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
            activeIndex: 0,
            activePost: null,
        };
        this.handleChange = this._handleChange.bind(this);
        this._handleComments = this._handleComments.bind(this);
        this._handleNewComment = this._handleNewComment.bind(this);
    }

    componentDidMount() {
        document.title = "Welcome to the Party";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.activePost !== this.state.activePost) {
            // Switch to the "comments" tab when the active post has changed
            this.setState({
                activeIndex: 2,
            });
        }
    }

    _handleChange({activeTabIndex, event}) {
        event.preventDefault();
        // Change the active tab
        this.setState({
            activeIndex: activeTabIndex
        });
        if (activeTabIndex === 2) {
            // Scroll to the post, if showing comments, making sure it is in view
            if (this.state.postCardRef.current) {
                this.state.postCardRef.current.scrollIntoView({behavior: "smooth"});
            }
        }
    }

    _handleComments(post, ref) {
        this.setState({
            activePost: post,
            activeIndex: 0,
            postCardRef: ref,
        });
    }

    _handleNewComment(id, comment) {
        const post = posts.find((post) => post.id === id);
        if (post) {
            post.comments.push(comment);
        }
        this.forceUpdate();
    }

    _handleContent(activePost) {
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
                                    post={activePost}
                                    onComment={this._handleNewComment}/>;
                break;
            default:
                content = <AttendeeList stylist={stylist}
                                        host={host}
                                        attendees={[attendee1, attendee2]}/>;
        }
        return content;
    }

    render() {
        const {activePost} = this.state;
        const content = this._handleContent(activePost);

        let tabs = [
            {
                text: "Attendees",
                href: "#"
            },
            {
                text: "Chat",
                href: "#"
            }
        ];
        if (activePost !== null) {
            tabs.push({
                text: "Comments",
                href: "#"
            });
        }

        return <Box
            direction="row"
            display="flex"
            height="100%"
            wrap
        >
            <Column span={12} mdSpan={8}>
                <Box flex="grow"
                     display="flex"
                     direction="column"
                     height="100%">
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
                        display="flex"
                        direction="column"
                        padding={4}
                        flex="grow"
                        overflow="auto">
                        {posts.map(post => {
                            return <PostCard
                                post={post}
                                key={post.id}
                                highlighted={activePost && post.id === activePost.id}
                                onSelect={this._handleComments}/>;
                        })}
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
                            tabs={tabs}
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
    status: 'present',
};

const host = {
    id: '2',
    name: {
        first: 'Host',
        last: 'Lastname',
    },
    handle: 'host',
    status: 'present',
};

const attendee1 = {
    id: '3',
    name: {
        first: 'Jane',
        last: 'Doe',
    },
    handle: 'jane.doe',
    status: 'present',
};

const attendee2 = {
    id: '4',
    name: {
        first: 'Stacy',
        last: 'Smith',
    },
    handle: 'stacy.smith',
    status: 'invited',
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
        id: '5',
        from: stylist,
        when: '2018-07-06T18:03:00-0500',
        text: 'I now want to test a much longer message to see if it works and how wraps. Does this look ok? I hope so. If not you should fix it.'
    },
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

const posts = [
    {
        id: '1',
        from: stylist,
        when: '2018-07-06T18:01:00-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum, lacus vel convallis dictum, orci lectus rutrum purus, vel tincidunt nisi nunc nec nisi. Vestibulum auctor urna sed elementum cursus. Suspendisse nec pellentesque urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        likes: 2,
        comments: comments
    },
    {
        id: '2',
        from: stylist,
        when: '2018-07-06T18:01:00-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum, lacus vel convallis dictum, orci lectus rutrum purus, vel tincidunt nisi nunc nec nisi. Vestibulum auctor urna sed elementum cursus. Suspendisse nec pellentesque urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        likes: 5,
        comments: []
    },
];

export default PartyPage;