import React from 'react';
import repos from "store";
import {withStyles} from '@material-ui/core/styles';
import AttendeeSetupCard from 'components/Party/Login/AttendeeSetupCard';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
});

class AttendeeSetupPage extends React.Component {

    componentDidMount() {
        document.title = "Join the Party";
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

export default withStyles(styles)(AttendeeSetupPage);