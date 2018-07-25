// @flow
import * as React from "react";
import withRoot from '../withRoot';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PartyPage from "./Party/PartyPage";
import LoginPage from "./Party/LoginPage";
import AdminDashboardPage from "./Admin/DashboardPage";
import AdminPartiesPage from "./Admin/PartiesPage";
import AdminPartyPage from "./Admin/PartyPage";
import type {AccountType, AuthContext, ProfileType} from 'data/Context';
import {Provider} from 'data/Context';
import {app, User} from 'firebase/app';
import 'gestalt/dist/gestalt.css';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 100%;
`;

type Props = {
    firebase: app.App,
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

    async componentWillMount() {
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
    }

    lookup = async (authUser: User): Promise<UserLookup> => {
        if (authUser) {
            const {firebase} = this.props;
            const user = await firebase
                .firestore()
                .doc('users/' + authUser.uid)
                .get();
            let profile = null;
            if (user && user.exists) {
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
    };

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