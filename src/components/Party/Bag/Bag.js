import React from 'react';
import {Box, IconButton, Image, Text} from 'gestalt';
import {BagType} from "types/Types";

class Bag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bag: props.bag,
        }
    }

    render() {
        const {bag} = this.state;

        return <Box padding={3}
                    direction="column"
                    display="flex">
            <Box alignItems="center">
                <Text bold
                      size="md"
                      align="center">
                    Shopping List
                </Text>
            </Box>
            <Box direction="column"
                 display="flex"
                 padding={2}>
                {bag.items.map(item => {
                    return <Box direction="row"
                                display="flex">
                        <Box>
                            <Image src={item.image}
                                   alt={item.name}
                                   color="rgb(111, 91, 77)"
                                   naturalWidth={50}
                                   naturalHeight={50}/>
                        </Box>
                        <Box>
                            <Box>
                                <Text>{item.name}</Text>
                            </Box>
                            <Box marginLeft={1}>
                                <Text italic color="gray">x {item.quantity}</Text>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton
                                accessibilityLabel="Remove Item"
                                size="sm"
                                icon="cancel"/>
                        </Box>
                    </Box>;
                })}
            </Box>
        </Box>;
    }
}

Bag.propTypes = {
    bag: BagType.isRequired,
};

export default Bag;