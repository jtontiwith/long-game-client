import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './registration-page.css';
import {login} from '../actions/auth';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
      return <Redirect to="/board/" /> //this has to become dynamic
  }

  function handleClick(e) {
    e.preventDefault();
    props.dispatch(login('sampleuser@example.com', '1111111111'));
    console.log('The link was clicked.');
  }

  return (
      <div className="home">
          <h2 className="reg-h2">Register for TopView</h2>
          <div className="byline">The easy 5 year > 1 year > 1 month > 1 week > 1 day planning app</div>
          <RegistrationForm />
          <footer className="reg-login-footer"><Link to="/" className="reg-login-footer-links">Login</Link> or check out the live <a href="#" onClick={handleClick} className="reg-login-footer-links">demo</a>.</footer>  
      </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);