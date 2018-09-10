import React from 'react';
import './week.css';

import YearCard from './year-card';

export default class Week extends React.Component {
  render() {
    /* the calc for positioning */
    const first = ((new Date().getDate() - new Date().getDay()) + 1) //get the day of the month (in a num), subtract the day of the week (again in a num), and add one so that's it now a Sunday
    const last = first + 6; // last day is the first day + 6
    const firstDayOfWeek = new Date(new Date().setDate(first));
    firstDayOfWeek.setHours(0,0,0,0);
    const lastDayOfWeek = new Date(new Date().setDate(last));
    lastDayOfWeek.setHours(0,0,0,0);
    // number of days in between 
    const oneWeekPeriod = Math.floor((lastDayOfWeek - firstDayOfWeek) / 86400000);
    console.log(`One week period ${oneWeekPeriod}`)
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //here we are filter out the outcomes that don't fall by the end of
    //the week
    const oneWeekOutcomes = this.props.outcomes
      .filter(outcome => outcome.date <= lastDayOfWeek && outcome.range >= 7)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.round(Math.abs((outcome.date - firstDayOfWeek) / 86400000));
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneWeekPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        let leftPositioning = Math.round(width * pixelFinderFractionX);
        //hack/fix to ensure outcomes at the end of periods don't run off screen
        if(leftPositioning >= (width - 50)) {
          leftPositioning = width - 80;
        }
        console.log(leftPositioning);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} key={index} />
      });

      //creating dates to show on the board
      let startAndEndDates;
      if(this.props.range === 7) {
        startAndEndDates = <div>
          <span className="dates start-date">{firstDayOfWeek.toDateString().slice(3)}</span>
          <span className="dates end-date">{lastDayOfWeek.toDateString().slice(3)}</span>    
          </div>
      }  

      return(
        <div className={"one-week-parent " + (this.props.range === 7 ? "time-highlight" : null) }>
          {startAndEndDates}
          <h2 className="year-header">This Week</h2>
          <div>{oneWeekOutcomes}</div>
        </div>

      )

  }
}