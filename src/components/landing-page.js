import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/board/" />;
    }

    return (
        <div className="home">
            <h2 class="reg-h2">Welcome to TopView</h2>
            <div className="byline">The easy 5 year > 1 year > 1 month > 1 week > 1 day planning app</div>
            <LoginForm />
            <footer className="reg-login-footer"><Link to="/register" className="reg-login-footer-links">Register</Link> or check out the live <a href="#" className="reg-login-footer-links">demo</a>.</footer>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);