import React from 'react';
import repos from "store";
import store from "store";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import AttendeeSetupCard from 'components/Party/Login/AttendeeSetupCard';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    failureMessage: {
        padding: 10
    },
});

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginInProgress: null !== this.props.partyId,
            loginSucceeded: false
        };
    }

    componentDidMount() {
        const {partyId} = this.props;
        const auth = repos.firebase.auth();

        document.title = "Join the Party";

        const url = window.location.href;
        if (auth.isSignInWithEmailLink(url)) {
            const email = LoginPage.getParameterByName('email', url);
            if (null !== auth.currentUser) {
                console.log('Already logged in');

            } else {
                auth
                    .signInWithEmailLink(email, url)
                    .then(result => {
                        const uid = result.user.uid;
                        if (uid) {
                            // Set the party and attendee
                            return store
                                .setParty(partyId)
                                .then(() => store.setAttendee(uid))
                                .then(() => {
                                    this.setState({
                                        loginInProgress: false,
                                        loginSucceeded: true
                                    });
                                });
                        } else {
                            return Promise.reject(new Error('Failed to login with: ' + JSON.stringify(result)));
                        }
                    })
                    .catch(error => {
                        // Some error occurred, you can inspect the code: error.code
                        // Common errors could be invalid email and invalid or expired OTPs.
                        console.error('Login failed', error);
                        this.setState({
                            loginInProgress: false,
                            loginSucceeded: false
                        });
                    });
            }
        }
    }

    static getParameterByName(name, url) {
        // eslint-disable-next-line
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    render() {
        const {classes} = this.props;
        const {partyId} = this.props;
        const {loginInProgress} = this.state;
        const {loginSucceeded} = this.state;

        // Waiting for login
        if (loginInProgress) {
            return <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <CircularProgress className={classes.progress}
                                          style={{color: purple[500]}}
                                          size={120}
                                          thickness={7}/>
                    </Grid>
                </Grid>
            </Grid>;

            // Login succeeded, get additional details from attendee
        } else if (loginSucceeded) {
            const name = store.current.attendee.name;
            const handle = name.first.toLowerCase() + '.' + name.last.toLowerCase();

            return <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container
                          justify="center"
                          spacing={16}>
                        <AttendeeSetupCard partyId={partyId} handle={handle}/>
                    </Grid>
                </Grid>
            </Grid>;

            // Login failed, show failed message
        } else {
            return <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Typography color="textSecondary"
                                    variant={"headline"}
                                    align={"center"}
                                    className={classes.failureMessage}>
                            Login failed. Please contact your stylist to request a new login email.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>;
        }
    }
}

export default withStyles(styles)(LoginPage);