import React from 'react';
import repos from "store";
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginCard from 'components/Party/Login/LoginCard';

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
        return <div>
            <LoginCard/>
            <CircularProgress />
        </div>;
    }
}

export default LoginPage;