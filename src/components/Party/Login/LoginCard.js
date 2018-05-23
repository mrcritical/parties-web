import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     height: 140,
    //     width: 100,
    // },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        width: 300,
    },
    actions: {
        display: 'flex',
    },
    button: {
        marginLeft: 'auto'
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

    joinParty() {
        // your submit logic
    }

    render() {
        const {email} = this.state;
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
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" color="primary" classes={classes.button}>Join</Button>
                    </CardActions>
                </Card>
            </ValidatorForm>
        );
    }
}

export default withStyles(styles)(LoginCard);