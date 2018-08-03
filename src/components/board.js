import React from 'react';
import {connect} from 'react-redux';

import './board.css';
import OutcomeForm from './outcome-form';
import TimeRangeTracker from './time-range-tracker';
//import Timelines from './timelines';  <Timelines outcomes={this.props.outcomes} />
import Years from './years';
import Year from './year';
import Month from './month';
import Week from './week';
import Today from './today';

import {addOutcome} from '../actions';

export class Board extends React.Component {
  addOutcome(whatText, whyText, outcomeDate, range) {
    this.props.dispatch(addOutcome(whatText, whyText, outcomeDate, range))
  }
  
  render() {
    console.log(this.props);
    return (
        <div>
        <OutcomeForm onAdd={(whatText, whyText, outcomeDate, range) => this.addOutcome(whatText, whyText, outcomeDate, range)} />
        <TimeRangeTracker />
        <Years outcomes={this.props.outcomes} />
        <Year outcomes={this.props.outcomes} />
        <Month outcomes={this.props.outcomes} />
        <Week outcomes={this.props.outcomes} />
        <Today outcomes={this.props.outcomes} />
        </div>
      );  
    }
    
}

const mapStateToProps = state => ({
  outcomes: state.outcomes
});

export default connect(mapStateToProps)(Board);



