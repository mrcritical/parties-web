import React from 'react';
import {ProductType} from "types/Types";
import {Box, Button, Card, Flyout, Image, SelectList, Text} from 'gestalt';
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  z-index: 1001;
`;

class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingQuantity: false,
            quantity: 1,
        };
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange({value}) {
        this.setState({
            quantity: value
        })
    }

    render() {
        const product = this.props.data;

        let amountOptions = [];
        for (let i = 1; i <= 20; i++) {
            amountOptions.push({
                value: i,
                label: i + ""
            });
        }

        return <Box
            color="white"
            shape="rounded">
            <Card
                image={
                    <Image src={product.image}
                           alt={product.name}
                           naturalHeight={50}
                           naturalWidth={50}
                    />
                }>
                <Box padding={4}>
                    <Box>
                        <Text align="center"
                              bold
                              size="xl">
                            {product.name}
                        </Text>
                    </Box>
                    <Box marginTop={2}>
                        <Text align="center"
                              size="lg">
                            ${product.cost}{product.qualifier ? ' / ' + product.qualifier : ''}
                        </Text>
                    </Box>
                </Box>
                <Box padding={2}>
                    <Container>
                        <div ref={i => {
                            this.addButtonAnchor = i;
                        }}>
                            <Button accessibilityHaspopup
                                    accessibilityLabel="Add to Shopping Bag"
                                    color="red"
                                    text="Add to Bag"
                                    onClick={() => this.setState({showingQuantity: true})}
                            />
                            {this.state.showingQuantity &&
                            <Flyout onDismiss={() => this.setState({showingQuantity: false})}
                                    anchor={this.addButtonAnchor}
                                    idealDirection="up"
                                    size="sm"
                            >
                                <Box direction="column"
                                     display="flex"
                                     flex="stretch"
                                     alignItems="center"
                                     justifyContent="center"
                                     padding={2}
                                width="100%">
                                    <Box alignItems="center"
                                         justifyContent="center"
                                         padding={2}>
                                        <Text bold
                                              align="center"
                                              size="lg"
                                        >
                                            How many?
                                        </Text>
                                    </Box>
                                    <Box direction="row"
                                         display="flex"
                                         padding={2}>
                                        <Box>
                                            <SelectList
                                                id={product.id + '-quantity'}
                                                onChange={this._handleChange}
                                                options={amountOptions}
                                                value={this.state.quantity}
                                            />
                                        </Box>
                                        <Box marginLeft={4}
                                             flex="grow">
                                            <Button accessibilityLabel="Add"
                                                    color="red"
                                                    text="Add"
                                                    onClick={() => this.props.onAddToBag(product, this.state.quantity)}/>
                                        </Box>
                                    </Box>
                                </Box>
                            </Flyout>
                            }
                        </div>
                    </Container>
                </Box>
            </Card>
        </Box>;
    }
}

ProductCard.propTypes = {
    data: ProductType.isRequired,
    onAddToBag: PropTypes.func.isRequired,
};

export default ProductCard;