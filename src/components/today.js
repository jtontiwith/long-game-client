import React from 'react';
import './today.css'

import YearCard from './year-card';

export default class Today extends React.Component {
  render() {
    //the end of the day, last second
    const endOfToday = new Date(new Date().setHours(23,59,59,999));


    const todayOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < endOfToday)
      .map((outcome, index) => {
        return <li><YearCard outcomeInfo={outcome} outcomeInfo={outcome} key={index} /></li>
      })

    return (
      <div className={"today-parent " + (this.props.range === 1 ? "time-highlight" : null) }>
        <h2 className="year-header">Today</h2>
        <div>
          <ul className="today-ul">
            {todayOutcomes}
          </ul>
        </div>
      </div>
  );

  }


} 


