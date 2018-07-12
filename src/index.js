import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/Index';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import localeData from 'translations/translations';
import * as moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import registerServiceWorker from './registerServiceWorker';

addLocaleData([...en, ...es, ...fr, ...de]);

const language = navigator.language.split(/[-_]/)[0];
// Set Date/Time Locale
moment.locale(language);

// Try full locale, fallback to 'en'
const messages = localeData[language] || localeData.en;
console.log('Messages: ' + JSON.stringify(messages));

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
if (!window.intl) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/es.js',
        'intl/locale-data/jsonp/fr.js',
        'intl/locale-data/jsonp/it.js',
    ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/es.js');
        require('intl/locale-data/jsonp/fr.js');
        require('intl/locale-data/jsonp/it.js');
        ReactDOM.render(
            <IntlProvider locale={language} messages={messages}>
                <Index />
            </IntlProvider>,
            document.getElementById('root')
        );
    });
} else {
    ReactDOM.render(
        <IntlProvider locale={language} messages={messages}>
            <Index />
        </IntlProvider>,
        document.getElementById('root')
    );
}

registerServiceWorker();