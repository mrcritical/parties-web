// @flow
import * as React from "react";
import ReactDOM from 'react-dom';
import Index from './pages/Index';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import localeData from 'translations/translations';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {initFirestorter} from 'firestorter';
import * as serviceAccount from './firebase-account';
import * as moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment-timezone';
import registerServiceWorker from './registerServiceWorker';

const firebaseApp = firebase.initializeApp(serviceAccount);
firebase
    .firestore()
    .settings({
        timestampsInSnapshots: true
    });

initFirestorter({firebase: firebase});

addLocaleData([...en, ...es, ...fr, ...de]);

const language = navigator.language.split(/[-_]/)[0];
// Set Date/Time Locale
moment.locale(language);

// Start the pooled timer which runs every 60 seconds
// (60000 milliseconds) by default.
Moment.startPooledTimer();

// Try full locale, fallback to 'en'
const messages = localeData[language] || localeData.en;

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
                <Index firebase={firebaseApp} />
            </IntlProvider>,
            document.getElementById('root')
        );
    });
} else {
    ReactDOM.render(
        <IntlProvider locale={language} messages={messages}>
            <Index firebase={firebaseApp} />
        </IntlProvider>,
        document.getElementById('root')
    );
}

registerServiceWorker();