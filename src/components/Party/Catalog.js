import React from 'react';
import {CatalogType} from "types/Types";
import {Box, Button, Masonry, SearchField, Tabs} from 'gestalt';
import ProductCard from 'components/Party/ProductCard';
import PropTypes from "prop-types";
import {defineMessages, injectIntl, intlShape} from 'react-intl';

const translations = defineMessages({
    searchPlaceHolder: {
        id: 'catalog.search_place_holder',
        defaultMessage: 'Find my perfect match',
    },
    closeCatalog: {
        id: 'catalog.close_button',
        defaultMessage: 'Back',
    }
});

class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            products: this.props.catalog.products,
            activeIndex: 0,
        };
        this._find = this._find.bind(this);
        this._handleTabChange = this._handleTabChange.bind(this);
        if (props.catalog.categories && props.catalog.categories.length > 0) {
            this.tabs = [{
                text: 'All',
                query: '',
                href: "#",
            }];
            const that = this;
            props.catalog.categories.forEach(category => {
                that.tabs.push({
                    text: category.name,
                    query: category.id,
                    href: "#",
                });
            });
        }
    }

    _search(query) {
        this._find(query, false);
        this.setState({
            value: query, // Add text to search box
            activeIndex: query.length === 0 ? 0 : null, // No tab highlighted if there is a value
        });
    }

    _find(query, exact) {
        const {products} = this.props.catalog;
        const normalized = query.toLowerCase();
        const matches = products.filter(product => {
            return product.name.toLowerCase().includes(normalized)
                || (product.tags ? product.tags.find(tag => exact ? tag.toLowerCase() === normalized : tag.toLowerCase().includes(normalized)) : false);
        });
        this.setState({
            value: '', // No text in search box
            products: matches,
        });
    }

    _handleTabChange({activeTabIndex, event}) {
        event.preventDefault();
        // Change the active tab
        this.setState({
            activeIndex: activeTabIndex
        });
        this._find(this.tabs[activeTabIndex].query, true);
    }

    render() {
        const {products} = this.state;
        const {formatMessage} = this.props.intl;
        const handler = this.props.onAddToBag;
        const tabContent = this.tabs ?
            <Box display="flex"
                 alignItems="center"
                 justifyContent="center"
                 marginTop={2}>
                <Tabs
                    tabs={this.tabs}
                    activeTabIndex={this.state.activeIndex}
                    onChange={this._handleTabChange}
                />
            </Box>
            : null;

        return <Box direction="column"
                    display="flex">
            <Box direction="column"
                 display="flex"
                 color="white"
                 flex="none"
                 padding={6}
                 marginTop={-2}
            >
                <Box direction="row"
                     display="flex"
                     marginBottom={2}
                >
                    <Box>
                        <Button
                            text={formatMessage(translations.closeCatalog)}
                            accessibilityLabel={formatMessage(translations.closeCatalog)}
                            color="red"
                            size="sm"
                            onClick={() => this.props.hide()}/>
                    </Box>
                </Box>
                <Box
                    flex="grow">
                    <SearchField
                        accessibilityLabel={formatMessage(translations.searchPlaceHolder)}
                        id="searchField"
                        onChange={({value}) => this._search(value)}
                        placeholder={formatMessage(translations.searchPlaceHolder)}
                        value={this.state.value}
                    />
                </Box>
                {tabContent}
            </Box>
            <Box padding={4}
                 direction="column"
                 flex="grow"
                 overflow="auto">
                <Masonry comp={
                    (props) => {
                        const product = props.data;
                        const key = props.itemIdx;
                        return <ProductCard data={product}
                                            key={key}
                                            currency={this.props.currency}
                                            onAddToBag={handler}/>
                    }}
                         items={products}
                         gutterWidth={14}
                         flexible>
                </Masonry>
            </Box>
        </Box>;
    }
}

Catalog.propTypes = {
    catalog: CatalogType.isRequired,
    onAddToBag: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    currency: PropTypes.string,
    intl: intlShape.isRequired,
};

Catalog.defaultProps = {
    currency: 'USD'
};

export default injectIntl(Catalog);