// @flow
import * as React from 'react';
import {Box, Button, Card, Flyout, Image, SelectList, Text} from 'gestalt';
import styled from 'styled-components';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

const translations = defineMessages({
    addToBag: {
        id: 'product.add_to_bag_button',
        defaultMessage: 'Add to Bag',
    },
    quantityLabel: {
        id: 'product.how_many_question',
        defaultMessage: 'How many?',
    },
    addButton: {
        id: 'product.add_button',
        defaultMessage: 'Add',
    },
});

const Container = styled.div`
  position: relative;
  z-index: 1001;
`;

type InitL = {
    formatMessage: Function,
    formatNumber: Function,
};

type Currency = 'USD';

type ProductImage = {
    url: string,
    width?: number,
    height?: number,
    caption?: string,
};

type Product = {
    id: string,
    name: string,
    image: ProductImage,
    cost: number,
    qualifier?: string,
    tags?: Array<string>,
};

type Props = {
    data: Product,
    onAddToBag: Function,
    currency?: Currency,
    intl: InitL,
};

type State = {
    showingQuantity: boolean,
    quantity: string;
};

type Option = {
    value: string,
    label: string,
};

class ProductCard extends React.Component<Props, State> {

    state = {
        showingQuantity: false,
        quantity: "1",
    };

    static defaultProps = {
        currency: 'USD'
    };

    addButtonAnchor: any;

    _handleChange: ({ event: SyntheticInputEvent<>, value: string }) => void = ({value}): void => {
        this.setState({
            quantity: value
        })
    };

    render() {
        const product: Product = this.props.data;
        const {formatMessage, formatNumber} = this.props.intl;

        let amountOptions: Array<Option> = [];
        for (let i = 1; i <= 20; i++) {
            amountOptions.push({
                value: i + "",
                label: i + ""
            });
        }

        return <Box
            color="white"
            shape="rounded">
            <Card
                image={
                    <Image src={product.image.url}
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
                            {formatNumber(product.cost, { style: 'currency', currency: this.props.currency })}{product.qualifier ? ' / ' + product.qualifier : ''}
                        </Text>
                    </Box>
                </Box>
                <Box padding={2}>
                    <Container>
                        <div ref={i => {
                            this.addButtonAnchor = i;
                        }}>
                            <Button accessibilityHaspopup
                                    accessibilityLabel={formatMessage(translations.addToBag)}
                                    color="red"
                                    text={formatMessage(translations.addToBag)}
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
                                            <FormattedMessage
                                                id={translations.quantityLabel.id}
                                                defaultMessage={translations.quantityLabel.defaultMessage}
                                            />
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
                                            <Button accessibilityLabel={formatMessage(translations.addButton)}
                                                    color="red"
                                                    text={formatMessage(translations.addButton)}
                                                    onClick={() => this.props.onAddToBag(product, Number(this.state.quantity))}/>
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
    };
}

export default injectIntl(ProductCard);