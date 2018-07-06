import React from 'react';
import {Avatar, Box, Button, Column, Heading, IconButton, Image, Text} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import styled from 'styled-components';

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
    }

    componentDidMount() {
        document.title = "Welcome to the Party";
    }

    render() {
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
                                    <Avatar name="stylist" size="md"/>
                                </Box>
                                <Box paddingX={1} flex="grow">
                                    <Text bold>Your Stylist</Text>
                                    <Text italic color="gray">10 minutes ago</Text>
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique
                                        tincidunt
                                        justo at dapibus. Quisque dictum a nibh non mattis. Fusce faucibus tortor
                                        libero, ut
                                        dignissim erat ultrices at.
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
                <Box color="white" height="100%">
                    <Box id="attendee-list">
                        <Box
                            alignItems="center"
                            direction="row"
                            display="flex"
                            color="green"
                            padding="4">
                            <Box paddingX={1}>
                                <Avatar name="stylist" size="md"/>
                            </Box>
                            <Box paddingX={1} flex="grow">
                                <Text bold color="white">Your Stylist</Text>
                                <Text color="white">@stylist</Text>
                            </Box>
                        </Box>
                        <Box
                            alignItems="center"
                            direction="row"
                            display="flex"
                            color="green"
                            padding="4">
                            <Box paddingX={1}>
                                <Avatar name="host" size="md"/>
                            </Box>
                            <Box paddingX={1} flex="grow">
                                <Text bold color="white">Your Host</Text>
                                <Text color="white">@host</Text>
                            </Box>
                        </Box>
                        <Box
                            alignItems="center"
                            direction="row"
                            display="flex"
                            padding="4">
                            <Box paddingX={1}>
                                <Avatar name="chrislloyd" size="md"/>
                            </Box>
                            <Box paddingX={1} flex="grow">
                                <Text bold>Chris Lloyd</Text>
                                <Text>@chrislloyd</Text>
                            </Box>
                        </Box>
                        <Box
                            alignItems="center"
                            direction="row"
                            display="flex"
                            padding="4">
                            <Box paddingX={1}>
                                <Avatar name="chrislloyd" size="md"/>
                            </Box>
                            <Box paddingX={1} flex="grow">
                                <Text bold>Chris Lloyd</Text>
                                <Text>@chrislloyd</Text>
                            </Box>
                        </Box>
                        <Box
                            alignItems="center"
                            direction="row"
                            display="flex"
                            padding="4">
                            <Box paddingX={1}>
                                <Avatar name="chrislloyd" size="md"/>
                            </Box>
                            <Box paddingX={1} flex="grow">
                                <Text bold>Chris Lloyd</Text>
                                <Text>@chrislloyd</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box id="chat-with-list"
                         direction="row"
                         display="visuallyHidden"
                         height="100%">
                        <Column span={9}>
                            <Box id="chat">
                                <Text>Chat Window</Text>
                            </Box>
                        </Column>
                        <Column span={3}>
                            <Box direction="column"
                                 display="flex"
                                 justifyContent="start"
                                 alignItems="stretch"
                                 color="lightGray"
                                 height="100%">
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    display="flex"
                                    color="green"
                                    padding="4">
                                    <Avatar name="stylist" size="md"/>
                                </Box>
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    display="flex"
                                    color="green"
                                    padding="4">
                                    <Avatar name="host" size="md"/>
                                </Box>
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    display="flex"
                                    padding="4">
                                    <Avatar name="chrislloyd" size="md"/>
                                </Box>
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    display="flex"
                                    padding="4">
                                    <Avatar name="chrislloyd" size="md"/>
                                </Box>
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    display="flex"
                                    padding="4">
                                    <Avatar name="chrislloyd" size="md"/>
                                </Box>
                            </Box>
                        </Column>
                    </Box>
                </Box>
            </Column>
        </Box>;
    }
}

export default PartyPage;