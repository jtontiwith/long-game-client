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
        return <YearCard outcomeInfo={outcome} key={index} />
      })

    return (
      <div className="today-parent">
        <h2 className="today-header">Today</h2>
        <div>
          <ul>
            <li>{todayOutcomes}</li>
          </ul>
        </div>
      </div>
  )

  }


} 


