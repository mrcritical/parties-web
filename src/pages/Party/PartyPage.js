import React from 'react';
import {Box, Column, Flyout, Heading, IconButton, Tabs} from 'gestalt';
import styled from 'styled-components';
import AttendeeList from 'components/Party/AttendeeList';
import Chat from 'components/Party/Chat';
import Comments from 'components/Party/Comments';
import PostCard from "components/Party/PostCard";
import Bag from "components/Party/Bag";
import Catalog from "components/Party/Catalog";
import update from 'immutability-helper';

// All CSS measurements based on 4px * x

const PageHeader = styled.div`
  position: relative;
  font-size: 1.5em;
  text-align: center;
  background-color: #5b2677;
  height: 200px;
  padding: 16px;
  z-index: 1000;
`;

class PartyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            activePost: null,
            showingBag: false,
            showingCatalog: false,
        };
        this.handleChange = this._handleChange.bind(this);
        this._handleComments = this._handleComments.bind(this);
        this._handleNewComment = this._handleNewComment.bind(this);
        this._handleBagButton = this._handleBagButton.bind(this);
        this._handleHideBag = this._handleHideBag.bind(this);
        this._toggleCatalog = this._toggleCatalog.bind(this);
        this._addToBag = this._addToBag.bind(this);
        this._removeFromBag = this._removeFromBag.bind(this);
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

    _handleSideBar(activePost) {
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
                content = <AttendeeList me={attendee1}
                                        stylist={stylist}
                                        host={host}
                                        attendees={[attendee1, attendee2]}/>;
        }
        return content;
    }

    _handleMainContent(activePost) {
        if(this.state.showingCatalog) {
            return <Box
                display="flex"
                direction="column"
                color="lightGray"
                flex="grow">
                <Catalog catalog={catalog}
                         onAddToBag={this._addToBag} />
            </Box>;
        } else {
            return <Box
                display="flex"
                direction="column"
                padding={4}
                flex="grow"
                overflow="auto"
                color="lightGray">
                {posts.map(post => {
                    return <PostCard
                        post={post}
                        key={post.id}
                        highlighted={activePost && post.id === activePost.id}
                        onSelect={this._handleComments}/>;
                })}
            </Box>;
        }
    }

    _handleBagButton() {
        this.setState({
            showingBag: !this.state.showingBag
        });
    }

    _handleHideBag() {
        this.setState({
            showingBag: false
        });
    }

    _toggleCatalog() {
        this.setState({
            showingCatalog: !this.state.showingCatalog
        })
    }

    _removeFromBag(itemToRemove) {
        const index = bag.items.findIndex(item => item.id === itemToRemove.id);
        if (index > -1) {
            bag = update(bag, {
                items: {$splice: [[index, 1]]},
                total: {$set: bag.total - itemToRemove.total}
            });
            this.forceUpdate();
        }
    }

    _addToBag(product, quantity) {
        const itemTotal = product.cost * quantity;
        bag.items.push({
            id: Math.floor((Math.random() * 10000) + 1),
            name: product.name,
            image: product.image,
            cost: product.cost,
            quantity: quantity,
            total: itemTotal
        });
        bag.total += itemTotal;
        this.forceUpdate();
    }

    render() {
        const {activePost} = this.state;
        const sideBarContent = this._handleSideBar(activePost);
        const mainContent = this._handleMainContent(activePost);

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
            flex="grow"
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
                                <IconButton accessibilityLabel="Show Catalog"
                                            onClick={() => this._toggleCatalog()}
                                            icon="menu"
                                />
                            </Box>
                            <div
                                ref={i => {
                                    this.bagAnchor = i;
                                }}>
                                <IconButton
                                    accessibilityLabel="Shopping Bag"
                                    accessibilityHaspopup
                                    icon="shopping-bag"
                                    iconColor="white"
                                    onClick={this._handleBagButton}
                                />
                                {this.state.showingBag &&
                                    <Flyout
                                        anchor={this.bagAnchor}
                                        onDismiss={this._handleHideBag}
                                        idealDirection="down"
                                        size="xl"
                                    >
                                        <Bag bag={bag}
                                             onRemove={this._removeFromBag}/>
                                    </Flyout>
                                }
                            </div>
                        </Box>
                    </PageHeader>
                    {mainContent}
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
                    {sideBarContent}
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

let bag = {
    items: [{
        image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
        name: 'Atlantis',
        quantity: 2,
        costPer: 10,
        total: 20
    }],
    total: 20
};

const catalog = {
  products: [
      {
          id: '1',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 1',
          cost: 10,
          tags: [
              'nail-art'
          ]
      },
      {
          id: '2',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 2',
          cost: 10,
          tags: [
              'solid'
          ]
      },
      {
          id: '3',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 3',
          cost: 10,
          tags: [
              'solid'
          ]
      },
      {
          id: '4',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 4',
          cost: 10,
          tags: [
              'glitter-designs'
          ]
      },
      {
          id: '5',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 5',
          cost: 10,
          tags: [
              'glitter-design'
          ]
      },
      {
          id: '6',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 6',
          cost: 10,
          tags: [
              'pretty',
              'blue',
              'french'
          ],
      },
      {
          id: '7',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 7',
          cost: 10,
          tags: [
              'blue',
              'nail-art'
          ],
      },
      {
          id: '8',
          image: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          name: 'Atlantis 8',
          cost: 10,
          tags: [
              'cool',
              'glitter'
          ],
      }
  ]
};

export default PartyPage;