import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../withRoot';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PartyPage from "./Party/PartyPage";
import LoginPage from "./Party/LoginPage";
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

class Index extends React.Component {
    render() {
        return (
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
                    </Switch>
                </PageContainer>
            </Router>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(Index);