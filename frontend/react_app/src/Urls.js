import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PasswordUpdate from "./components/PasswordUpdate";
import AddLoanOfficer from "./components/PasswordUpdate";
import RegisterCompany from "./components/PasswordUpdate";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
function Urls(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login/"> <Login {...props} /></Route>
                    <Route exact path="/register/"> <Register {...props} /></Route>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}><Home {...props} /></PrivateRoute>
                    <PrivateRoute exact path="/update_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props} /></PrivateRoute>
                    <PrivateRoute exact path="/add_loan_officer/" isAuthenticated={props.isAuthenticated}><AddLoanOfficer {...props} /></PrivateRoute>
                    <PrivateRoute exact path="/register_company/" isAuthenticated={props.isAuthenticated}><RegisterCompany {...props} /></PrivateRoute>
                    <PrivateRoute exact path="/update_company/" isAuthenticated={props.isAuthenticated}><RegisterCompany {...props} /></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </div>
    )
};
export default Urls;