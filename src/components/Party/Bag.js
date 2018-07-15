import React from 'react';
import {Box, IconButton, Image, Text} from 'gestalt';
import {BagType} from "types/Types";
import PropTypes from "prop-types";
import {defineMessages, FormattedMessage, FormattedNumber, injectIntl, intlShape} from 'react-intl';

const translations = defineMessages({
    title: {
        id: 'bag.title',
        defaultMessage: 'Shopping List',
    },
    totalLabel: {
        id: 'bag.total_label',
        defaultMessage: 'Total',
    },
    removeItemLabel: {
        id: 'remove_item_label',
        defaultMessage: 'Remove Item',
    }
});

class Bag extends React.Component {

    render() {
        const {bag} = this.props;
        const {formatMessage} = this.props.intl;

        return <Box padding={3}
                    direction="column"
                    display="flex"
                    width="100%">
            <Box alignItems="center">
                <Text bold
                      size="md"
                      align="center">
                    <FormattedMessage
                        id={translations.title.id}
                        defaultMessage={translations.title.defaultMessage}
                    />
                </Text>
            </Box>
            <Box direction="column"
                 display="flex"
                 flex="grow"
                 padding={2}>
                {bag.items.map(item => {
                    return <Box direction="row"
                                display="flex"
                                justifyContent="between"
                                alignItems="center"
                                padding={2}>
                        <Box width={50}
                             height={50}
                             flex="none">
                            <Image src={item.image.url}
                                   alt={item.name}
                                   color="rgb(111, 91, 77)"
                                   naturalWidth={350}
                                   naturalHeight={350}/>
                        </Box>
                        <Box marginLeft={2}
                             direction="row"
                             display="flex"
                             flex="grow">
                            <Box
                                flex="none">
                                <Text>{item.name}</Text>
                            </Box>
                            <Box marginLeft={1}
                                 flex="grow">
                                <Text italic color="gray">x {item.quantity}</Text>
                            </Box>
                        </Box>
                        <Box
                            flex="none">
                            <Text bold
                                  italic
                                  align="left">
                                <FormattedNumber value={item.total}
                                    // eslint-disable-next-line
                                                 style="currency"
                                                 currency={this.props.currency}/>
                            </Text>
                        </Box>
                        <Box
                            marginLeft={2}
                            flex="none">
                            <IconButton
                                accessibilityLabel={formatMessage(translations.removeItemLabel)}
                                size="sm"
                                icon="cancel"
                                onClick={() => this.props.onRemove(item)}
                            />
                        </Box>
                    </Box>;
                })}
                <Box justifyContent="right"
                     alignItems="end"
                     direction="row"
                     display="flex"
                     marginTop={4}>
                    <Box flex="grow">
                        <Text align="right">
                            <FormattedMessage id={translations.totalLabel.id}
                                              defaultMessage={translations.totalLabel.defaultMessage}
                            />
                        </Text>
                    </Box>
                    <Box flex="none"
                         marginLeft={2}
                         marginRight={3}>
                        <Text bold>
                            <FormattedNumber value={bag.total}
                                // eslint-disable-next-line
                                             style="currency"
                                             currency={this.props.currency}/>
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>;
    }
}

Bag.propTypes = {
    bag: BagType.isRequired,
    onRemove: PropTypes.func.isRequired,
    currency: PropTypes.string,
    intl: intlShape.isRequired,
};

Bag.defaultProps = {
    currency: 'USD'
};

export default injectIntl(Bag);