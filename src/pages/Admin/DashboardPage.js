// @flow
import * as React from 'react';
import {Box, Column, Image, Text} from 'gestalt';
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import type {IntLType} from "types/Types";

const translations = defineMessages({
    title: {
        id: 'admin.dashboard.title',
        defaultMessage: 'Hello',
    }
});

type Props = {
    intl: IntLType,
};

class DashboardPage extends React.Component<Props> {
    render() {
        return <Box direction="row"
                    display="flex"
                    flex="grow"
                    wrap
                    height="100%">
            <Column span={3} mdSpan={2}>
                <Box color="darkGray"
                     flex="grow"
                     display="flex"
                     direction="column"
                     height="100%">
                    <Box paddingX={10} paddingY={4}>
                        <Image src="/static/images/frontdesk_logo.png"
                               alt="Logo"
                               naturalWidth={144}
                               naturalHeight={152}/>
                    </Box>
                    <ul>
                        <li>
                            <Text bold color="white">
                                Dashboard
                            </Text>
                        </li>
                        <li>
                            <Text bold color="white">
                                Parties
                            </Text>
                        </li>
                        <li>
                            <Text bold color="white">
                                Contacts
                            </Text>
                        </li>
                        <li>
                            <Text bold color="white">
                                Orders
                            </Text>
                        </li>
                        <li>
                            <Text bold color="white">
                                Reports
                            </Text>
                        </li>
                    </ul>
                </Box>
            </Column>
            <Column span={9} mdSpan={10}>
                <Box flex="grow"
                     display="flex"
                     direction="column"
                     height="100%">
                    <Box color="blue" height={140} padding={6}>
                        <Text bold size="xl" color="white">
                            <FormattedMessage id={translations.title.id}
                                              defaultMessage={translations.title.defaultMessage}/>
                        </Text>
                    </Box>
                    <Box flex="grow" padding={6}>
                        <Text bold size="xl">
                            <FormattedMessage id={translations.title.id}
                                              defaultMessage={translations.title.defaultMessage}/>
                        </Text>
                    </Box>
                </Box>
            </Column>
        </Box>;
    }
}

export default injectIntl(DashboardPage);