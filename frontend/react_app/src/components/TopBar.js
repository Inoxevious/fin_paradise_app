import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function TopAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Financial Paradise App
          </Typography>
                    <IconButton aria-label="home page" color="inherit" href="/">
                        <HomeIcon />
                    </IconButton>

                    {props.isAuthenticated ? <Button color="inherit" href="/update_password">Update Password</Button> : null}
                    {props.isAuthenticated ? <Button color="inherit" href="/register_company">Company Profille</Button> : null}
                    {props.isAuthenticated ? <Button color="inherit" href="/add_loan_officer">Add Loan Officer</Button> : null}

                    {props.isAuthenticated ? <Button color="inherit" onClick={() => props.logout()}>Logout</Button> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}
