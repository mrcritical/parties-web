import React from 'react';
import {CatalogType} from "types/Types";
import {Box, Masonry, SearchField} from 'gestalt';
import ProductCard from 'components/Party/ProductCard';
import PropTypes from "prop-types";

class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            products: this.props.catalog.products,
        };
        this._find = this._find.bind(this);
    }

    _find(query) {
        const {products} = this.props.catalog;
        const normalized = query.toLowerCase();
        const matches = products.filter(product => {
            return product.name.toLowerCase().includes(normalized) || (product.tags ? product.tags.find(tag => tag.toLowerCase().includes(normalized)) : false);
        });
        this.setState({
            value: query,
            products: matches
        });
    }

    render() {
        const {products} = this.state;
        const handler = this.props.onAddToBag;

        return <Box direction="column"
                    display="flex">
            <Box direction="row"
                 display="flex"
                 flex="none">
                <Box flex="grow"
                     color="white"
                     padding={6}>
                    <SearchField
                        accessibilityLabel="Demo Search Field"
                        id="searchField"
                        onChange={({value}) => this._find(value)}
                        placeholder="Find my perfect nails"
                        value={this.state.value}
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