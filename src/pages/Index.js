// @flow
import * as React from "react";
import withRoot from 'withRoot';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PartyPage from "pages/Party/PartyPage";
import LoginPage from "pages/Party/LoginPage";
import AdminDashboardPage from "pages/Admin/DashboardPage";
import AdminPartiesPage from "pages/Admin/PartiesPage";
import AdminPartyPage from "pages/Admin/PartyPage";
import type {AccountType, AuthContext, ProfileType} from 'data/Context';
import {Provider} from 'data/Context';
import type {App} from '@firebase/app';
import 'gestalt/dist/gestalt.css';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 100%;
`;

type Props = {
    firebase: App,
};

type UserLookup = {
    account: ?AccountType,
    profile: ?ProfileType,
};

class Index extends React.Component<Props, AuthContext> {

    state = {
        user: this.props.firebase.auth().currentUser,
        hasLoaded: Boolean(this.props.firebase.auth().currentUser),
    };

    unsubscribe: () => void;

    componentWillMount(): void {
        (async () => {
            const {firebase} = this.props;

            // If user already logged in and no profile then lookup account and profile
            if (this.state.user && this.state.profile === null) {
                try {
                    const result: UserLookup = await this.lookup(this.state.user);
                    this.setState({
                        account: result.account,
                        profile: result.profile,
                    });
                } catch (error) {
                    console.log('Error occurred on lookup: ' + error);
                }
            }

            // Handle any changes to auth state
            this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
                try {
                    const result: UserLookup = await this.lookup(user);
                    this.setState({
                        hasLoaded: !!user,
                        user,
                        account: result.account,
                        profile: result.profile,
                    });
                } catch (error) {
                    console.log('Error occurred on lookup on auth change: ' + error);
                }
            });
        })();
    }

    async lookup(authUser: any): Promise<UserLookup> {
        if (authUser && authUser.uid) {
            const {firebase} = this.props;
            const user = await firebase
                .firestore()
                .doc('users/' + authUser.uid)
                .get();
            let profile = null;
            if (user && user.exists && user.data().profile) {
                profile = await user.data().profile.get();
            } else {
                throw new Error('User not found');
            }
            return {
                account: {
                    id: user.data().accountId,
                },
                profile,
            };
        } else {
            return {
                account: null,
                profile: null,
            }
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        return (
            <Provider value={this.state}>
                <Router>
                    <PageContainer>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <div>
                                    Hello
                                </div>
                            )}/>
                            <Route path="/parties/:partyId/join" exact render={props => (
                                <LoginPage {...props.match.params}/>
                            )}/>
                            <Route path="/parties/:partyId" render={props => (
                                <PartyPage {...props.match.params}/>
                            )}/>
                            <Route path="/admin" render={props => (
                                <AdminDashboardPage {...props.match.params}/>
                            )}/>
                            <Route path="/admin/parties" render={props => (
                                <AdminPartiesPage {...props.match.params}/>
                            )}/>
                            <Route path="/admin/parties/:partyId" render={props => (
                                <AdminPartyPage {...props.match.params}/>
                            )}/>
                        </Switch>
                    </PageContainer>
                </Router>
            </Provider>
        );
    }
}

export default withRoot(Index);