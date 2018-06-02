import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {func, arrayOf, shape, string} from 'prop-types';
import Post from 'components/Party/Posts/Post/Post';

const styles = theme => ({
    root: {},
    card: {
        paddingBottom: theme.spacing.unit * 2,
    },
});

const postType = shape({
    id: string.isRequired,
});

class Posts extends React.Component {
    render() {
        const {classes} = this.props;
        const {posts} = this.props;
        const {onClick} = this.props;

        return <div className={classes.root}>
            {posts.map(post => {
                return <div className={classes.card}>
                    <Post post={post} onClick={onClick}/>
                </div>;
            })}
        </div>;
    }
}

Posts.propTypes = {
    posts: arrayOf(postType).isRequired,
    onClick: func,
};

Posts.defaultProps = {
    posts: [
        {
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
                count: 0
            },
            likes: {
                count: 1
            }
        },
        {
            id: "2",
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
                count: 1
            },
            likes: {
                count: 3
            }
        },
        {
            id: "3",
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
                count: 0
            }
        }
    ],
};

export default withStyles(styles)(Posts);