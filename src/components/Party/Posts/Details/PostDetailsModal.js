import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostDetailsHeader from 'components/Party/Posts/Details/Header/PostDetailHeader';
import PostCommentForm from 'components/Party/Posts/Details/Comments/PostCommentForm';
import PostComments from 'components/Party/Posts/Details/Comments/PostComments';
import {arrayOf, shape, string} from "prop-types";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '100%',
    }
});

const postCommentType = shape({
    id: string.isRequired,
});

class PostDetailsModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Grid container className={classes.root}>
            <Grid container
                  spacing={24}
                  alignItems={"stretch"}
                  direction={"column"}>
                <Grid item xs={12} sm={8}>
                    <PostDetailsHeader/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <PostCommentForm/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <PostComments/>
                </Grid>
            </Grid>
        </Grid>;
    }
}

PostDetailsModal.propTypes = {
    post: postCommentType.isRequired,
};

PostDetailsModal.defaultProps = {
    post: {

    },
};

export default withStyles(styles)(PostDetailsModal);