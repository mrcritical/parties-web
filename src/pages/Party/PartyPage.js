import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    main: {
        width: '100%',
    },
    header: {
        height: theme.spacing.unit * 20,
    },
    paper: {
        padding: theme.spacing.unit * 2,
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
});

class PartyPage extends React.Component {

    componentDidMount() {
        document.title = "Welcome to the Party";
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
                            <Card className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Stylist" className={classes.avatar}>
                                            S
                                        </Avatar>
                                    }
                                    title="Stylist Name @stylist"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/temp/color-street-begin.jpg"
                                    title="Let the fun begin!"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography component={"p"}>
                                        Brief description about this picture or video.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" aria-label="Favorite">
                                        <FavoriteIcon className={classes.icon}/>
                                        10 Likes
                                    </Button>
                                    <Button size="small" color="primary" aria-label="Comment">
                                        <CommentIcon className={classes.icon}/>
                                        3 Comments
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Chat</Paper>
                </Grid>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(PartyPage);