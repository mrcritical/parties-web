// @flow
import * as React from "react";
import withRoot from '../withRoot';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PartyPage from "./Party/PartyPage";
import LoginPage from "./Party/LoginPage";
import AdminDashboardPage from "./Admin/DashboardPage";
import AdminPartiesPage from "./Admin/PartiesPage";
import AdminPartyPage from "./Admin/PartyPage";
import {Consumer, Provider, UserContext} from 'data/Context';
import Moment from 'react-moment';
import 'moment-timezone';
import 'gestalt/dist/gestalt.css';
import styled from 'styled-components';

// Start the pooled timer which runs every 60 seconds
// (60000 milliseconds) by default.
Moment.startPooledTimer();

const PageContainer = styled.div`
  height: 100%;
`;

type Props = {};

type State = {
    context: UserContext,
};

class Index extends React.Component<Props, State> {
    state = {
        context: Provider.defaultValue,
    };

    render() {
        return (
            <Provider value={this.state.context}>
                <Consumer>
                    {context =>
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
                    }
                </Consumer>
            </Provider>
        );
    }
}

export default withRoot(Index);