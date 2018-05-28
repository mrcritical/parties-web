import React from 'react';
import repos from "store";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
});

class LoginPage extends React.Component {

    componentDidMount() {
        document.title = "Join the Party";

        const url = window.location.href;
        const firebase = repos.firebase();
        if (firebase.auth().isSignInWithEmailLink(url)) {
            const email = LoginPage.getParameterByName('email', url);
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(email, url)
                .then(function (result) {
                    // Redirect to landing
                    window.location.replace('/parties/1');
                })
                .catch(function (error) {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                    console.error('LoginPage failed', error);
                });
        }
    }

    static getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    render() {
        const {classes} = this.props;

        return <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={16}>
                    <AttendeeSetupCard/>
                </Grid>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(LoginPage);