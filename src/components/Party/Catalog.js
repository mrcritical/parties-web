// @flow
import * as React from 'react';
import type {CatalogType, InitL, Product} from "types/Types";
import {Box, Button, Masonry, SearchField, Tabs} from 'gestalt';
import ProductCard from 'components/Party/ProductCard';
import {defineMessages, injectIntl} from 'react-intl';

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

type Props = {
    catalog: CatalogType,
    onAddToBag: Function,
    hide: Function,
    currency: string,
    intl: InitL,
};

type State = {
    value: string,
    activeIndex: number,
    products: Array<Product>,
};

type Tab = {
  text: string,
  href: string,
};

class Catalog extends React.Component<Props, State> {

    state = {
        value: '',
        activeIndex: 0,
        products: this.props.catalog.products,
    };

    tabs: Array<Tab> = [];

    queries: Map<string, string> = {};

    static defaultProps = {
        currency: 'USD',
    };

    constructor(props) {
        super(props);
        if (props.catalog.categories && props.catalog.categories.length > 0) {
            this.tabs = [{
                text: 'All',
                href: "#",
            }];
            this.queries['All'] = '';
            const that = this;
            props.catalog.categories.forEach(category => {
                that.tabs.push({
                    text: category.name,
                    href: "#",
                });
                that.queries[category.name] = category.id;
            });
        }
    }

    search(query) {
        this.find(query, false);
        this.setState({
            value: query, // Add text to search box
            activeIndex: query.length === 0 ? 0 : null, // No tab highlighted if there is a value
        });
    }

    find: (query: string, exact: string) => void = (query, exact) => {
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
    };

    handleTabChange: ({ activeTabIndex: number, event: SyntheticMouseEvent<> }) => void = ({activeTabIndex, event}) => {
        event.preventDefault();
        // Change the active tab
        this.setState({
            activeIndex: activeTabIndex
        });
        this.find(this.queries[this.tabs[activeTabIndex].text], true);
    };

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
                    onChange={this.handleTabChange}
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
                        onChange={({value}) => this.search(value)}
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

export default injectIntl(Catalog);