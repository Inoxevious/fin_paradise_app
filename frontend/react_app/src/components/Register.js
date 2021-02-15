import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux';
import * as actions from '../store/authActions';

import { useHistory, useLocation } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));







function Register(props) {
    const classes = useStyles();
    const [username, setuserName] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [first_name, setfirstName] = React.useState(null);
    const [last_name, setlastName] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    React.useEffect(() => {
        if (props.isAuthenticated) { history.replace(from) };
    });


    const handleFormFieldChange = (event) => {
        switch (event.target.id) {
            case 'username': setuserName(event.target.value); break;
            case 'password': setPassword(event.target.value); break;
            case 'first_name': setfirstName(event.target.value); break;
            case 'last_name': setlastName(event.target.value); break;
            case 'email': setEmail(event.target.value); break;
            default: return null;
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAuth(username, password, first_name, last_name, email);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* {success ? <Typography variant="button" className={classes.success} gutterBottom>Register successful! : {error}</Typography> : null} */}

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Signup
        </Typography>
                <form className={classes.form} noValidate
                    onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        autoFocus
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        autoFocus
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleFormFieldChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        SignUp
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Already have an account? SignIn"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, first_name, last_name, email) => dispatch(actions.authRegister(username, password, first_name, last_name, email))
    }
}

export default connect(null, mapDispatchToProps)(Register);