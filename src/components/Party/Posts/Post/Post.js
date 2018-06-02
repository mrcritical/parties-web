import React from 'react';
import {withStyles} from '@material-ui/core/styles';

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
import {func, shape, number, string} from 'prop-types';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
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

const avatarType = shape({
    url: string.isRequired,
    letter: string,
});

const byType = shape({
    name: string.isRequired,
    handle: string.isRequired,
    avatar: avatarType.isRequired,
});

const mediaType = shape({
    url: string.isRequired,
    type: string.isRequired,
    caption: string,
});

const countType = shape({
    count: number.isRequired
});

const postType = shape({
    id: string.isRequired,
    by: byType.isRequired,
    description: string,
    media: mediaType,
    likes: countType.isRequired,
    comments: countType.isRequired,
});

class Post extends React.Component {
    render() {
        const {classes} = this.props;
        const {post} = this.props;
        const {onClick} = this.props;
        const likesLabel = 'Like' + (post.likes.count !== 1 ? 's': '');
        const commentsLabel = 'Comment' + (post.comments.count !== 1 ? 's': '');

        return <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="Stylist" className={classes.avatar}>
                        {post.by.avatar.letter}
                    </Avatar>
                }
                title={post.by.name + ' @' + post.by.handle}
            />
            <CardMedia
                className={classes.media}
                image={post.media.url}
                title={post.media.caption}
            />
            <CardContent className={classes.cardContent}>
                <Typography component={"p"}>
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" aria-label="Favorite" onClick={onClick.bind(this, post)}>
                    <FavoriteIcon className={classes.icon}/>
                    {post.likes.count} {likesLabel}
                </Button>
                <Button size="small" color="primary" aria-label="Comment" onClick={onClick.bind(this, post)}>
                    <CommentIcon className={classes.icon}/>
                    {post.comments.count} {commentsLabel}
                </Button>
            </CardActions>
        </Card>;
    }
}

Post.propTypes = {
    post: postType.isRequired,
    onClick: func,
};

Post.defaultProps = {
    post: {
        id: "1",
        by: {
            name: "Stylist Name",
            handle: "stylist",
            avatar: {
                url: "",
                letter: "S",
            },
        },
        media: {
            url: "/static/images/temp/color-street-begin.jpg",
            type: "image",
            caption: "Let the fun begin!",
        },
        description: "Brief description about this picture or video.",
        comments: {
            count: 3
        },
        likes: {
            count: 10
        }
    },
};

export default withStyles(styles)(Post);