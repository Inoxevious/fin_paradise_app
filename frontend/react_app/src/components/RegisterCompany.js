import React from 'react';
import axios from 'axios';
import * as settings from '../settings';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    success: {
        color: theme.palette.success.main,
    }
}));

function RegisterCompany(props) {
    const classes = useStyles();
    const [business_name, setbusinessName] = React.useState(null);
    const [business_trading_name, setbusinessTradingName] = React.useState(null);
    const [total_branches, settotalBranches] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const handleFormFieldChange = (event) => {
        setSuccess(false);
        switch (event.target.id) {
            case 'business_name': setbusinessName(event.target.value); break;
            case 'business_trading_name': setbusinessTradingName(event.target.value); break;
            case 'total_branches': settotalBranches(event.target.value); break;
            case 'address': setAddress(event.target.value); break;
            case 'phone': setPhone(event.target.value); break;
            default: return null;
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let headers = { 'Authorization': `Token ${props.token}` };
        let method = 'post';
        let url = settings.API_SERVER + '/api/auth/add_company/';
        let companyFormData = new FormData();
        companyFormData.append('business_name', setbusinessName);
        companyFormData.append('business_trading_name', setbusinessTradingName);
        companyFormData.append('total_branches', settotalBranches);
        companyFormData.append('address', setAddress);
        companyFormData.append('phone', setPhone);

        let config = { headers, method, url, data: companyFormData };
        //Axios company regi API call
        axios(config).then(res => {
            setSuccess(true);
        }).catch(
            error => {
                alert(error)
            })


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {success ? <Typography variant="button" className={classes.success} gutterBottom>Password update successful!</Typography> : null}
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add MFI
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="business_name"
                        label="Business Name"
                        type="text"
                        id="business_name"
                        onChange={handleFormFieldChange}
                    // error={new_password1 !== new_password2}
                    // helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="business_trading_name"
                        label="Business TradingName"
                        type="text"
                        id="business_trading_name"
                        onChange={handleFormFieldChange}
                    // error={new_password1 !== new_password2}
                    // helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="total_branches"
                        label="Business Total Branches"
                        type="number"
                        id="total_branches"
                        onChange={handleFormFieldChange}
                    // error={new_password1 !== new_password2}
                    // helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Business address"
                        type="text"
                        id="address"
                        onChange={handleFormFieldChange}
                    // error={new_password1 !== new_password2}
                    // helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Business Phone"
                        type="phone"
                        id="phone"
                        onChange={handleFormFieldChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save
          </Button>
                </form>
            </div>
        </Container>
    );
}


export default RegisterCompany;