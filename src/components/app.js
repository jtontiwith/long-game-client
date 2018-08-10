import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Board from './board';
import Landing from './landing';
//outcomes={props.outcomes} <-this was inside board

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


