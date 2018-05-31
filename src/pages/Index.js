import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PartyPage from "./Party/PartyPage";
import LoginPage from "./Party/LoginPage";
import 'typeface-roboto';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

class Index extends React.Component {
    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <Router>
                <div className={classes.root}>
                    <Route exact path="/" render={() => (
                        <div>
                            <Dialog open={open} onClose={this.handleClose}>
                                <DialogTitle>Super Secret Password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>1-2-3-4-5</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.handleClose}>
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Typography variant="display1" gutterBottom>
                                Material-UI
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                example project
                            </Typography>
                            <Button variant="raised" color="secondary" onClick={this.handleClick}>
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