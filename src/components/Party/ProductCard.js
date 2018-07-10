import React from 'react';
import {ProductType} from "types/Types";
import {Box, Button, Card, Image, Text} from 'gestalt';
import PropTypes from "prop-types";

class ProductCard extends React.Component {
    render() {
        const product = this.props.data;

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
                    <Text align="center"
                          bold
                          size="xl">
                        {product.name}
                    </Text>
                </Box>
                <Box padding={6}>
                    <Button accessibilityHaspopup
                            accessibilityLabel="Add to Shopping Bag"
                            color="red"
                            text="Add to Bag"
                            onClick={() => this.props.onAddToBag(product, 1)}
                    />
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