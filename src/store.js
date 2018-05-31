import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {Collection, Document, initFirestorter} from 'firestorter';
import * as serviceAccount from './firebase-account';

firebase.initializeApp(serviceAccount);
firebase
    .firestore()
    .settings({
        timestampsInSnapshots: true
    });

initFirestorter({firebase: firebase});

let currentUser = null;

class CurrentUser {
    constructor(accountId, profile) {
        this.accountId = accountId;
        this.profile = profile;
    }
}

// Detect changes to the logged in user. Keep the profile in local storage while logged in.
firebase.auth().onAuthStateChanged((authUser) => {
    if (null != authUser) {
        // User logged in
        firebase
            .firestore()
            .doc('users/' + authUser.uid)
            .get()
            .then(user => {
                if (user && user.exists) {
                    return Promise.all([
                        user,
                        user.data().profile.get()
                    ]);
                }
                return Promise.reject(new Error('User=' + authUser.uid + ' not found'));
            })
            .then(results => {
                currentUser = new CurrentUser(
                    results[0].accountId,
                    results[1]
                );
            })
            .catch(err => {
                console.error('User was not found', err);
            });
    } else {
        // User logged out
        currentUser = null;
    }
});

class Repository {

    constructor(firebase) {
        this.firebase = firebase;
        this.current = {
            user: currentUser,
            account: null,
            attendee: null,
            party: null
        };
        this.setAttendee = this.setAttendee.bind(this);
        this.saveAttendeePreferences = this.saveAttendeePreferences.bind(this);
        this.setParty = this.setParty.bind(this);
    }

    setParty(partyId) {
        const that = this;
        return firebase
            .firestore()
            .collection('/party-mappings')
            .doc(partyId)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    return documentSnapshot
                        .data()
                        .party
                        .get()
                        .then(partySnapshot => {
                            if (partySnapshot.exists) {
                                let party = partySnapshot.data();
                                party.id = partySnapshot.id;
                                party.ref = partySnapshot.ref;
                                that.current.party = party;
                                const accountRef = partySnapshot.ref.parent.parent;
                                return accountRef
                                    .get()
                                    .then(accountSnapshot => {
                                        if (accountSnapshot.exists) {
                                            let account = accountSnapshot.data();
                                            account.id = accountSnapshot.id;
                                            account.ref = accountSnapshot.ref;
                                            that.current.account = account;
                                            return account;
                                        } else {
                                            return Promise.reject(new Error('No accountSnapshot found'));
                                        }
                                    })
                                    .then(() => party);
                            } else {
                                return Promise.reject(new Error('No party found'));
                            }
                        });
                } else {
                    return Promise.reject(new Error('No party found'));
                }
            });
    }

    setAttendee(userId) {
        if (this.current.account && this.current.party) {
            const that = this;
            return firebase
                .firestore()
                .collection('accounts/' + this.current.account.id + '/parties/' + this.current.party.id + '/profiles')
                .where('userId', '==', userId)
                .limit(1)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.size > 0) {
                        const attendeeSnapshot = querySnapshot.docs[0];
                        let attendee = attendeeSnapshot.data();
                        attendee.id = attendeeSnapshot.id;
                        attendee.ref = attendeeSnapshot.ref;
                        that.current.attendee = attendee;
                        return attendee;
                    } else {
                        return Promise.reject(new Error('Failed to find the attendee'));
                    }
                });
        } else {
            return Promise.reject(new Error('No party and/or account set. Please set these first'));
        }
    }

    saveAttendeePreferences(prefs) {
        return this.current.attendee.ref.set(
            {
                handle: prefs.handle,
                avatar: {
                    url: prefs.avatar.url
                },
            },
            {
                merge: true
            });
    }

    // Get, an listen to updates, on the party
    party() {
        return new Document('accounts/' + this.current.account.id + '/parties/' + this.current.party.id);
    }

    // Get, and listen, to all attendees in the party
    attendees() {
        return new Collection('accounts/' + this.current.account.id + '/parties/' + this.current.party.id + '/attendees');
    }

    // Get, and listen to updates, to all posts in the party
    posts() {
        return new Collection('accounts/' + this.current.account.id + '/parties/' + this.current.party.id + '/posts');
    }

    // Get, and listen to updates, to all plans for the party
    plans() {
        return new Collection('accounts/' + this.current.account.id + '/parties/' + this.current.party.id + '/plans');
    }

    // Admin functions
    parties() {
        return new Collection('accounts/' + this.current.account.id + '/parties');
    }

    assets() {
        return new Collection('accounts/' + this.current.account.id + '/assets');
    }

    profiles() {
        return new Collection('accounts/' + this.current.account.id + '/profiles');
    }

    static accounts() {
        return new Collection('accounts');
    }

    static users() {
        return new Collection('users');
    }

}

export default new Repository(firebase);