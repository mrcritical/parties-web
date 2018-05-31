import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import AvatarSelector from './AvatarSelector';
import {string, object} from 'prop-types';
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import store from 'store';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        width: 300,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    handleField: {
        marginTop: 20,
    }
});

class AttendeeSetupCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handle: props.handle,
            avatar: null,
        };
        this.handleHandleChange = this.handleHandleChange.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
    }

    componentDidMount() {
        document.title = "Login to Join the Party";
    }

    handleHandleChange(event) {
        const handle = event.target.value;
        this.setState({handle});
    }

    handleAvatarChange(avatar) {
        this.setState({avatar});
    }

    joinParty(e) {
        e.preventDefault();
        // Add handling to set the attendee's preferences
        store
            .saveAttendeePreferences({
                handle: null !== this.state.handle ? this.state.handle : null,
                avatar: null !== this.state.avatar ? this.state.avatar : null,
            })
            .then(() => {
                this.props.history.push('/parties/' + this.props.partyId);
            });
    }

    render() {
        const {handle} = this.state;
        const {classes} = this.props;
        return (
            <ValidatorForm
                onSubmit={this.joinParty.bind(this)}
                onError={errors => console.log(errors)}
            >
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color="primary" variant={"title"} align={"left"} gutterBottom>
                            Almost there!
                        </Typography>
                        <Typography color="textSecondary" variant={"body1"} align={"left"}>
                            {`We just need a couple more things from you before you join the party.`}
                        </Typography>
                        <TextValidator
                            label="Handle"
                            helperText="Choose a handle to allow others to mention (refer to) you"
                            onChange={this.handleHandleChange}
                            name="handle"
                            value={handle}
                            fullWidth={true}
                            validators={['required']}
                            className={classes.handleField}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <AvatarSelector onChange={this.handleAvatarChange}/>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button variant="raised" color="primary" type={'submit'} classes={classes.button}>Join</Button>
                    </CardActions>
                </Card>
            </ValidatorForm>
        );
    }
}

AttendeeSetupCard.propTypes = {
    handle: string,
    partyId: string.isRequired,
    history: object.isRequired,
};

AttendeeSetupCard.defaultProps = {
    handle: 'jane.doe',
    partyId: "1",
};

export default compose(
    withRouter,
    withStyles(styles),
)(AttendeeSetupCard);