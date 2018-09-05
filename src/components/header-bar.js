import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    //testing should be line-by-line, test the methods, not props/state
    //don't test what you didn't code
    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logout-button" onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
                {logOutButton}
            </div>
        );
    }
}


const mapStateToProps = state => {
  console.log(state.auth.currentUser);
  return {
    loggedIn: state.auth.currentUser !== null
  }  
};

export default connect(mapStateToProps)(HeaderBar);
