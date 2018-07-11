import React from 'react';
import {CatalogType} from "types/Types";
import {Box, Masonry, SearchField, Tabs} from 'gestalt';
import ProductCard from 'components/Party/ProductCard';
import PropTypes from "prop-types";

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
        this.tabs = [
            {
                text: "All",
                href: "#",
                query: ''
            },
            {
                text: "French",
                href: "#",
                query: 'french'
            },
            {
                text: "Solids",
                href: "#",
                query: 'solid'
            },
            {
                text: "Glitter",
                href: "#",
                query: 'glitter'
            },
            {
                text: "Glitter Designs",
                href: "#",
                query: 'glitter-design'
            },
            {
                text: "Nail Art",
                href: "#",
                query: 'nail-art'
            },
            {
                text: "Seasonal",
                href: "#",
                query: 'seasonal'
            }
        ];
    }

    _search(query) {
        this._find(query, false);
        this.setState({
            value: query, // Add text to search box
            activeIndex: null, // No tab highlighted
        });
    }

    _find(query, exact) {
        const {products} = this.props.catalog;
        const normalized = query.toLowerCase();
        const matches = products.filter(product => {
            return product.name.toLowerCase().includes(normalized) || (product.tags ? product.tags.find(tag => exact ? tag.toLowerCase() === normalized : tag.toLowerCase().includes(normalized)) : false);
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
        const handler = this.props.onAddToBag;

        return <Box direction="column"
                    display="flex">
            <Box direction="column"
                 display="flex"
                 color="white"
                 flex="none"
                 padding={6}>
                <Box flex="grow">
                    <SearchField
                        accessibilityLabel="Demo Search Field"
                        id="searchField"
                        onChange={({value}) => this._search(value)}
                        placeholder="Find my perfect nails"
                        value={this.state.value}
                    />
                </Box>
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
};

export default Catalog;