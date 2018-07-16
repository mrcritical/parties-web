// @flow
import * as React from 'react';
import {Box, Text} from 'gestalt';
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import type {IntLType} from 'types/Types';

const translations = defineMessages({
    title: {
        id: 'admin.parities.title',
        defaultMessage: 'Hello',
    }
});

type Props = {
    intl: IntLType,
};

class PartiesPage extends React.Component<Props> {
    render() {
        return <Box direction="row"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%">
            <Text>
                <FormattedMessage id={translations.title.id}
                                  defaultMessage={translations.title.defaultMessage}/>
            </Text>
        </Box>;
    }
}

export default injectIntl(PartiesPage);