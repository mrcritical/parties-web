import React from 'react';
import repos from "store";
import { withStyles } from '@material-ui/core/styles';
import LoginCard from 'components/Party/Login/LoginCard';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     height: 140,
    //     width: 100,
    // },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        minWidth: 275,
        maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class LoginPage extends React.Component {

    componentDidMount() {
        const firebase = repos.firebase();
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    // Redirect to landing
                    window.location.replace('/');

                    // Clear email from storage.
                    //window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch(function (error) {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                    console.error('LoginPage failed', error);
                });
        }
    }

    render() {
        const { classes } = this.props;

        return <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={16}>
                    <LoginCard/>
                </Grid>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(LoginPage);