import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

const styles = {
    card: {
        minWidth: 275,
        maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

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

    joinParty() {
        // your submit logic
    }

    render() {
        const {email} = this.state;
        const { classes } = this.props;
        return (
            <ValidatorForm
                onSubmit={this.joinParty}
                onError={errors => console.log(errors)}
            >
            <Card className={classes.card}>
                <CardContent>
                    <Typography color="textSecondary">
                        Login
                    </Typography>
                        <TextValidator
                            label="Email"
                            onChange={this.handleChange}
                            name="email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                </CardContent>
                <CardActions>
                    <Button variant="raised">Join</Button>
                </CardActions>
            </Card>
            </ValidatorForm>
        );
    }
}

export default withStyles(styles)(LoginCard);