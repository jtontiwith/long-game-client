import React from 'react';
import './week.css';

import YearCard from './year-card';

export default class Week extends React.Component {
  render() {
    const today = new Date; 
    const first = ((today.getDate() - today.getDay()) + 1) //get the day of the month (in a num), subtract the day of the week (again in a num), and add one so that's it now a Sunday
    const last = first + 6; // last day is the first day + 6
    const firstDayOfWeek = new Date(today.setDate(first)); //.toUTCString();
    const lastDayOfWeek = new Date(today.setDate(last)); //.toUTCString();
    
    
    
    
    
    /* the calc for positioning */
    //5 year start
    const start = new Date();
    //one week end
    const weekEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate()+7);
    //console.log(`star ${start} and monthedn ${weekEnd}`)
    // number of days in between 
    const oneWeekPeriod = Math.floor((lastDayOfWeek - firstDayOfWeek) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    //here we are filter out the outcomes that don't fall by the end of
    //the week
    const oneWeekOutcomes = this.props.outcomes
      .filter(outcome => outcome.date < lastDayOfWeek && outcome.range >= 7)
      .map((outcome, index) => {
        //find # of days until the outcome is to be reached
        const daysUntilOutcome = Math.abs((outcome.date - firstDayOfWeek) / 86400000);
        //make a fraction to multiply the detected pixel count by
        const pixelFinderFractionX = daysUntilOutcome/oneWeekPeriod;
        //get the x-axis positioning by multiplying the number of available
        //pixels by the fraction
        const leftPositioning = Math.round(width * pixelFinderFractionX);
        //console.log(leftPositioning);
        return <YearCard leftp={leftPositioning} outcomeInfo={outcome} outcomeInfo={outcome} key={index} />
      });

      //console.log(oneWeekOutcomes);
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