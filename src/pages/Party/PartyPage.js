import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Posts from 'components/Party/Posts/Posts';
import red from '@material-ui/core/colors/red';
import PartyAttendeeList from 'components/Party/SideBar/AttendeeList/PartyAttendeeList';
import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    main: {
        width: '100%',
        overflow: 'scroll',
        padding: theme.spacing.unit,
    },
    header: {
        height: theme.spacing.unit * 20,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
    },
    attendeePaper: {
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
    },
    cardContent: {

    },
    title: {
        marginBottom: 16,
    },
    media: {
        height: 0,
        paddingTop: '20%',
        backgroundPosition: 'initial'
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
    avatar: {
        backgroundColor: red[500],
    },
    drawer: {
        width: theme.spacing.unit * 54,
    }
});

class PartyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsOpen: false,
            post: null,
        };
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
    }

    componentDidMount() {
        document.title = "Welcome to the Party";
    }

    showDetails(post) {
        this.setState({
            detailsOpen: true,
            post: post,
        });
    }

    hideDetails() {
        this.setState({
            detailsOpen: false,
            post: null,
        });
    }

    render() {
        const {classes} = this.props;
        return <Grid container className={classes.root}>
            <Grid container
                  spacing={24}
                  alignItems={"stretch"}
                  direction={"row"}
            >
                <Grid item xs={12} sm={8}>
                    <Grid container
                          className={classes.main}
                          spacing={0}
                          alignItems={"stretch"}
                          direction={"column"}>
                        <Grid item className={classes.header}>
                            <div className={classes.paper}>Header</div>
                        </Grid>
                        <Grid item>
                            <Posts onClick={this.showDetails}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.attendeePaper}>
                        <PartyAttendeeList/>
                    </Paper>
                </Grid>
            </Grid>
            <Drawer anchor="right" open={this.state.detailsOpen} onClose={this.hideDetails}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.hideDetails}
                    onKeyDown={this.hideDetails}
                    className={classes.drawer}
                >
                    {this.state.post ? this.state.post.description : ''}
                </div>
            </Drawer>
        </Grid>;
    }
}

export default withStyles(styles)(PartyPage);