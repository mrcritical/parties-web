import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PartyPage from "./Party/PartyPage";
import LoginPage from "./Party/LoginPage";
import 'typeface-roboto';
import Moment from 'react-moment';
import 'moment-timezone';
import 'gestalt/dist/gestalt.css';

// Start the pooled timer which runs every 60 seconds
// (60000 milliseconds) by default.
Moment.startPooledTimer();

const styles = () => ({
    root: {
        height: '100%'
    },
});

class Index extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <Route exact path="/" render={() => (
                        <div>
                            <Typography variant="display1" gutterBottom>
                                Material-UI
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                example project
                            </Typography>
                            <Button variant="raised" color="secondary">
                                Super Secret Password
                            </Button>
                        </div>
                    )}/>
                    <Route path="/parties/:partyId/join" render={props => (
                        <LoginPage {...props.match.params}/>
                    )}/>
                    <Route path="/parties/:partyId" render={props => (
                        <PartyPage {...props.match.params}/>
                    )}/>
                </div>
            </Router>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));