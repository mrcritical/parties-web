import React from 'react';
import {Box, Column, Flyout, Heading, IconButton, Tabs} from 'gestalt';
import styled, {css} from 'styled-components';
import AttendeeList from 'components/Party/AttendeeList';
import Chat from 'components/Party/Chat';
import Comments from 'components/Party/Comments';
import PostCard from "components/Party/PostCard";
import Bag from "components/Party/Bag";
import Catalog from "components/Party/Catalog";
import update from 'immutability-helper';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

// All CSS measurements based on 4px * x

const translations = defineMessages({
    shoppingBag: {
        id: 'page.party.shopping_bag',
        defaultMessage: 'Shopping Bag',
    },
    attendeeTabLabel: {
        id: 'page.party.tabs.attendees',
        defaultMessage: 'Attendees',
    },
    chatTabLabel: {
        id: 'page.party.tabs.chat',
        defaultMessage: 'Chat',
    },
    commentsTabLabel: {
        id: 'page.party.tabs.comments',
        defaultMessage: 'Comments',
    },
});

const PageHeader = styled.div`
  position: relative;
  font-size: 1.5em;
  text-align: center;
  background-color: ${props => props.backgroundColor};
  height: 200px;
  padding: 16px;
  z-index: 1000;
  ${props => props.image && css`
    background-image: url(${props => props.image});
    background-size: cover;
    -ms-background-size: cover; 
    -o-background-size: cover; 
    -moz-background-size: cover;
    -webkit-background-size: cover;
  `}
`;

const ContrastingContainer = styled.div`
  position: relative;
  padding: 12px 0;
  width: 100%;
  z-index: -1;
  ${props => props.contrast && css`
    background: rgba(0, 0, 0, 0.5);
  `}
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
        this._onChatMessage = this._onChatMessage.bind(this);
        this._onPostLike = this._onPostLike.bind(this);
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
                content = <Chat me={attendee1}
                                messages={Array.from(messages).reverse()}
                                onNewMessage={this._onChatMessage}
                />;
                break;
            case 2:
                // Comments
                content = <Comments me={attendee1}
                                    post={activePost}
                                    onComment={this._handleNewComment}
                />;
                break;
            default:
                content = <AttendeeList me={attendee1}
                                        presenter={stylist}
                                        host={host}
                                        attendees={[attendee1, attendee2]}
                                        colors={party.settings.attendees.colors.highlight}
                />;
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
                         onAddToBag={this._addToBag}
                         hide={this._toggleCatalog}
                />
            </Box>;
        } else {
            return <Box
                display="flex"
                direction="column"
                padding={4}
                marginTop={-4}
                flex="grow"
                overflow="auto"
                color="lightGray">
                {posts.map(post => {
                    return <PostCard
                        post={post}
                        key={post.id}
                        highlighted={activePost && post.id === activePost.id}
                        onSelect={this._handleComments}
                        onLike={this._onPostLike}
                        availableActions={[
                            {
                                name: 'catalog',
                                action: this._toggleCatalog
                            }
                        ]}
                    />;
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

        let existingItem = bag.items.find((item) => item.name === product.name);
        if (existingItem) {
            // Modify existing item
            existingItem.quantity += quantity;
            existingItem.total += itemTotal;

        } else {
            // Add new item
            bag.items.push({
                id: Math.floor((Math.random() * 10000) + 1),
                name: product.name,
                image: product.image,
                cost: product.cost,
                quantity: quantity,
                total: itemTotal
            });
        }
        bag.total += itemTotal;
        this.setState({
            // Sow the bag after adding to it
            showingBag: true
        });
    }

    _onChatMessage(message) {
        messages.push(message);
        this.forceUpdate();
    }

    _onPostLike(post) {
        if (post.liked) {
            post.likes--;
            post.liked = false;
        } else {
            post.likes++;
            post.liked = true;
        }
        this.forceUpdate();
    }

    render() {
        const {activePost} = this.state;
        const sideBarContent = this._handleSideBar(activePost);
        const mainContent = this._handleMainContent(activePost);
        const {formatMessage} = this.props.intl;

        let tabs = [
            {
                text: formatMessage(translations.attendeeTabLabel),
                href: "#"
            },
            {
                text: formatMessage(translations.chatTabLabel),
                href: "#"
            }
        ];
        if (activePost !== null) {
            tabs.push({
                text: formatMessage(translations.commentsTabLabel),
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
            <Column span={12}
                    mdSpan={8}>
                <Box flex="grow"
                     display="flex"
                     direction="column"
                     height="100%">
                    <PageHeader image={party.settings.header.image.url}
                                backgroundColor={party.settings.header.colors.background}
                                headerContrast={party.settings.header.colors.contrast}>
                        <Box direction="column"
                             display="flex"
                             height="100%">
                            <Box justifyContent="end"
                                 alignItems="start"
                                 direction="row"
                                 display="flex">
                                <div
                                    ref={i => {
                                        this.bagAnchor = i;
                                    }}>
                                    <IconButton
                                        accessibilityLabel={formatMessage(translations.shoppingBag)}
                                        accessibilityHaspopup
                                        icon="shopping-bag"
                                        iconColor={party.settings.header.colors.bag}
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
                            <Box alignItems="center"
                                 direction="row"
                                 display="flex"
                                 width="100%"
                                 height="100%">
                                <ContrastingContainer contrast={party.settings.header.colors.contrast}>
                                    <Heading color={party.settings.header.colors.text}
                                             size="lg">
                                        {party.name}
                                    </Heading>
                                </ContrastingContainer>
                            </Box>
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

PartyPage.propTypes = {
    intl: intlShape.isRequired,
};

// =====================
// Test data
// =====================
const stylist = {
    id: '1',
    name: {
        first: 'Kendra',
        last: 'Jarrell',
    },
    handle: 'stylist',
    status: 'present',
    avatar: {
        url: 'https://pinterest.github.io/gestalt/static/media/shanice.2bbdc6c0.jpg',
    },
};

const host = {
    id: '2',
    name: {
        first: 'Host',
        last: 'Lastname',
    },
    handle: 'host',
    status: 'invited',
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
        by: attendee1,
        when: '2018-07-06T18:01:00-0500',
        text: 'This product is cool. I want to buy it!'
    },
    {
        id: '2',
        by: stylist,
        when: '2018-07-06T18:02:00-0500',
        text: 'Ok. How many?'
    },
    {
        id: '3',
        by: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: '3'
    },
    {
        id: '4',
        by: stylist,
        when: new Date(),
        text: 'Done.'
    },
    {
        id: '5',
        by: stylist,
        when: '2018-07-06T18:03:00-0500',
        text: 'I now want to test a much longer message to see if it works and how wraps. Does this look ok? I hope so. If not you should fix it.'
    },
];

const comments = [
    {
        id: '1',
        by: attendee1,
        when: '2018-07-06T18:01:00-0500',
        text: 'Praesent eu sodales turpis, at molestie nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        likes: 2,
    },
    {
        id: '2',
        by: stylist,
        when: '2018-07-06T18:02:00-0500',
        text: 'Cras maximus, justo ut aliquam vestibulum, nunc lacus efficitur quam, vel malesuada leo dui in urna.'
    },
    {
        id: '3',
        by: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '4',
        by: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '5',
        by: attendee1,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '6',
        by: host,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
    {
        id: '7',
        by: host,
        when: '2018-07-06T18:02:30-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra erat ac pretium volutpat. Vivamus a arcu vitae sapien semper vehicula.',
        likes: 20,
    },
];

const posts = [
    {
        id: '1',
        by: stylist,
        when: '2018-07-06T18:01:00-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum, lacus vel convallis dictum, orci lectus rutrum purus, vel tincidunt nisi nunc nec nisi. Vestibulum auctor urna sed elementum cursus. Suspendisse nec pellentesque urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        likes: 2,
        image: {
            url: 'http://www.nailposse.com/wp-content/uploads/2017/07/Mardi-Gras-Blue-Glitter_slider.jpg',
            width: 561,
            height: 425
        },
        comments: comments,
        actions: [{
            trigger: 'catalog',
        }],
    },
    {
        id: '2',
        by: stylist,
        when: '2018-07-06T18:01:00-0500',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum, lacus vel convallis dictum, orci lectus rutrum purus, vel tincidunt nisi nunc nec nisi. Vestibulum auctor urna sed elementum cursus. Suspendisse nec pellentesque urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        likes: 5,
        video: {
            url: 'https://www.youtube.com/embed/sTYETQ2Dn7Y',
            type: 'youtube',
        },
        comments: [],
    },
];

let bag = {
    items: [
        {
            image: {
                url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
            },
        name: 'Atlantis',
        quantity: 2,
        costPer: 10,
        total: 20
        }
    ],
    total: 20
};

const catalog = {
    categories: [
        {
            id: 'french',
            name: 'French',
        },
        {
            id: 'solid',
            name: 'Solids',
        },
        {
            id: 'glitter',
            name: 'Glitter',
        },
        {
            id: 'glitter-designs',
            name: 'Glitter Designs',
        },
        {
            id: 'nail-art',
            name: 'Nail Art',
        },
        {
            id: 'seasonal',
            name: 'Seasonal',
        }
    ],
    products: [
      {
          id: '1',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 1',
          cost: 10,
          qualifier: 'set',
          tags: [
              'nail-art'
          ]
      },
      {
          id: '2',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 2',
          cost: 10,
          tags: [
              'solid'
          ]
      },
      {
          id: '3',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 3',
          cost: 10,
          tags: [
              'solid'
          ]
      },
      {
          id: '4',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 4',
          cost: 10,
          qualifier: 'set',
          tags: [
              'glitter-designs'
          ]
      },
      {
          id: '5',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 5',
          cost: 10,
          qualifier: 'set',
          tags: [
              'glitter-design'
          ]
      },
      {
          id: '6',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 6',
          cost: 10,
          qualifier: 'set',
          tags: [
              'pretty',
              'blue',
              'french'
          ],
      },
      {
          id: '7',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 7',
          cost: 10,
          qualifier: 'set',
          tags: [
              'blue',
              'nail-art'
          ],
      },
      {
          id: '8',
          image: {
              url: 'https://www.sassydirect.com/uploads/news-pictures/11323-las-vegas-blog-post-image-20180312111027.jpg',
          },
          name: 'Atlantis 8',
          cost: 10,
          qualifier: 'set',
          tags: [
              'cool',
              'glitter'
          ],
      }
  ]
};

const party = {
    name: "Ava's Nail Party",
    settings: {
        welcome: {
            background: {
                image: {
                    url: 'https://colorstreet.com/wp-content/uploads/2017/11/2-24-17-Incoco-ColorStreet.jpg',
                },
                color: 'purple',
            },
        },
        header: {
            image: {
                url: 'https://vnailpro.com/wp-content/uploads/2017/08/5StarRSBanner1-min.png',
            },
            colors: {
                text: 'white',
                background: '#5b2677',
                contrast: true,
                bag: 'white',
            },
        },
        attendees: {
            colors: {
                highlight: {
                    background: 'green',
                    online: 'white',
                    offline: 'pine',
                }
            },
        },
    }
};

export default injectIntl(PartyPage);