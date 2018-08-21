import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
import Board from './board';
//import Landing from './landing';
import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';



export class App extends React.Component {
  componentDidUpdate(prevProps) {
      if (!prevProps.loggedIn && this.props.loggedIn) {
          // When we are logged in, refresh the auth token periodically
          this.startPeriodicRefresh();
      } else if (prevProps.loggedIn && !this.props.loggedIn) {
          // Stop refreshing when we log out
          this.stopPeriodicRefresh();
      }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }

  render() {
      return (
          <div className="app">
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/register" component={RegistrationPage} />
              <Route exact path="/board/:userId" render={() => <Board />} />
              <h3><Link to="/board/:userId">login</Link></h3>
          </div>
      );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));


/*
The old working one...

this was in <Board /> - outcomes={props.outcomes}

export default function App(props) {
  return (
    <Router>
      <div> {console.log(props.outcomes)}
        <main>
          <Route exact path="/" component={Landing} />
          <Route exact path="/board/:userId" render={() => <Board outcomes={props.outcomes} />} />
          <h3><Link to="/board/:userId">login</Link></h3>
        </main>
      </div>
    </Router>
  )
}

*/