import React from 'react';
import {Box, Text} from 'gestalt';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from "react-intl";

const translations = defineMessages({
    title: {
        id: 'admin.dashboard.title',
        defaultMessage: 'Hello',
    }
});

class DashboardPage extends React.Component {
    render() {
        return <Box direction="row"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%">
            <Text bold size="xl">
                <FormattedMessage id={translations.title.id}
                                  defaultMessage={translations.title.defaultMessage}/>
            </Text>
        </Box>;
    }
}

DashboardPage.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(DashboardPage);