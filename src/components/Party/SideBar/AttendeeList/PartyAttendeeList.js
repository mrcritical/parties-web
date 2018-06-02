import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {arrayOf, shape, string} from 'prop-types';

const styles = theme => ({
    root: {
        backgroundColor: '#fafafa',
        height: '100%',
    },
    stylist: {
        backgroundColor: '#fff',
    },
    host: {
        backgroundColor: '#fff',
    },
    nav: {
        padding: 0,
    }
});

const attendeeType = shape({
    id: string.isRequired,
});

class PartyAttendeeList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {stylist} = this.props;
        const {host} = this.props;
        const {attendees} = this.props;

        return <div className={classes.root}>
            <List component="nav" className={classes.nav}>
                <ListItem button className={classes.stylist}>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                    <ListItemText primary={stylist.name.first + ' ' + stylist.name.last}
                                  secondary={'@' + stylist.handle}/>
                </ListItem>
                <ListItem button className={classes.host}>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                    <ListItemText primary={host.name.first + ' ' + host.name.last} secondary={'@' + host.handle}/>
                </ListItem>
                <Divider/>
                {attendees.map(attendee => {
                    const displayName = attendee.name.first + ' ' + attendee.name.last;
                    return (
                        <ListItem button>
                            <Avatar>
                                <ImageIcon/>
                            </Avatar>
                            <ListItemText primary={displayName} secondary={'@' + attendee.handle}/>
                        </ListItem>
                    );
                })}
            </List>
        </div>;
    }
}

PartyAttendeeList.propTypes = {
    stylist: attendeeType.isRequired,
    host: attendeeType.isRequired,
    attendees: arrayOf(attendeeType).isRequired,
};

PartyAttendeeList.defaultProps = {
    stylist: {
        id: '1',
        name: {
            first: 'Stylist',
            last: 'Lastname',
        },
        handle: 'stylist',
    },
    host: {
        id: '2',
        name: {
            first: 'Host',
            last: 'Lastname',
        },
        handle: 'host',
    },
    attendees: [
        {
            id: '3',
            name: {
                first: 'Jane',
                last: 'Doe',
            },
            handle: 'jane.doe',
        },
        {
            id: '4',
            name: {
                first: 'Stacy',
                last: 'Smith',
            },
            handle: 'stacy.smith',
        },
    ],
};

export default withStyles(styles)(PartyAttendeeList);