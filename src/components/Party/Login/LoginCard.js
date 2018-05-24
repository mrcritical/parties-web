import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

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
    avatars: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 52,
        height: 52,
        marginLeft: 5,
        marginRight: 5,
    },
    avatarContainer: {
        marginTop: 30
    }
});

class LoginCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const email = event.target.value;
        this.setState({email});
    }

    handleHandleChange(event) {
        const handle = event.target.value;
        this.setState({handle});
    }

    joinParty() {
        // your submit logic
    }

    render() {
        const {email} = this.state;
        const {handle} = this.state;
        const {classes} = this.props;
        return (
            <ValidatorForm
                onSubmit={this.joinParty}
                onError={errors => console.log(errors)}
            >
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color="primary" variant={"title"} align={"left"} gutterBottom>
                            Login
                        </Typography>
                        <Typography color="textSecondary" variant={"paragraph"} align={"left"}>
                            {`We just need a couple more things from you before you join the party.`}
                        </Typography>
                        <TextValidator
                            label="Email"
                            onChange={this.handleChange}
                            name="email"
                            value={email}
                            fullWidth={true}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                        <TextValidator
                            label="Handle"
                            helperText="Choose a name (handle) to allow others to chat with you"
                            onChange={this.handleHandleChange}
                            name="handle"
                            value={handle}
                            fullWidth={true}
                            validators={['required']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <div className={classes.avatarContainer}>
                            <Typography color="textSecondary" variant={"caption"} align={"left"}>
                                Please select an avatar to represent you, visually:
                            </Typography>
                            <div className={classes.avatars}>
                                <Avatar className={classes.avatar}>1</Avatar>
                                <Avatar className={classes.avatar}>2</Avatar>
                                <Avatar className={classes.avatar}>3</Avatar>
                                <Avatar className={classes.avatar}>4</Avatar>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button variant="raised" color="primary" classes={classes.button}>Join</Button>
                    </CardActions>
                </Card>
            </ValidatorForm>
        );
    }
}

export default withStyles(styles)(LoginCard);