import React from 'react';
import './month.css';

import YearCard from './year-card';

export default class Month extends React.Component {
  render() {
    /* the calc for positioning */
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    // number of days in between 
    const oneMonthPeriod = Math.round(Math.abs((lastDayOfMonth - firstDayOfMonth) / 86400000));
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //here we filter out the outcomes that don't fall by the end of
    //the month
    const oneMonthOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < lastDayOfMonth && outcome.range >= 30)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - firstDayOfMonth) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneMonthPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        let leftPositioning = Math.round(width * pixelFinderFractionX);
         //hack/fix to ensure outcomes at the end of periods don't run off screen
        if(leftPositioning >= (width - 50)) {
          leftPositioning = width - 80;
        }
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} key={index} />
      });
      
      let startAndEndDates;
      if(this.props.range === 30) {
        startAndEndDates = <div>
          <span className="dates start-date">{firstDayOfMonth.toDateString().slice(3)}</span>
          <span className="dates end-date">{lastDayOfMonth.toDateString().slice(3)}</span>    
          </div>
      }  
      
    return(
      <div className={"one-month-parent " + (this.props.range === 30 ? "time-highlight" : null) }>
        {startAndEndDates}   
        <h2 className="year-header">This Month</h2>
        <div>{oneMonthOutcomes}</div>
      </div>
    )

  }
}