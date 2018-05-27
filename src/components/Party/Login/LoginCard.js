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
    emailField: {
        marginTop: 10,
    },
    handleField: {
        marginTop: 10,
    }
});

class LoginCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            handle: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleHandleChange = this.handleHandleChange.bind(this);
    }

    componentDidMount() {
        document.title = "Login to Join the Party";
    }

    handleEmailChange(event) {
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
                        <Typography color="textSecondary" variant={"body1"} align={"left"}>
                            {`We just need a couple more things from you before you join the party.`}
                        </Typography>
                        <TextValidator
                            label="Email"
                            onChange={this.handleEmailChange}
                            name="email"
                            value={email}
                            fullWidth={true}
                            validators={['required', 'isEmail']}
                            className={classes.emailField}
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
                            className={classes.handleField}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                        <AvatarSelector/>
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