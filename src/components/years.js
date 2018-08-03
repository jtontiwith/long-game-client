import React from 'react';
import './years.css';
import YearCard from './year-card';

/*
DONE-I want to generate 5 year components based on the 5 dates
-I want to display the year ending date in each year component
    
-here I am generating a number of year components based on the number
of end year dates in the array, now, I want to supply each year 
component with the info (outcome objects that have a date that's 
before the end date associated with that year components date range)
because it doesn't seem to make sense to supply every year component
with all the outcome objects across the whole 5 years




*/

export default class Years extends React.Component {
  render() {
    
    //const top = '100px'; //hardcoding for top positioning
     /* the calc for positioning */
    //5 year start
    const fiveYearStart = new Date();
    //5 year end
    const fiveYearEnd = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    // number of days in between 
    const fiveYearPeriod = Math.floor((fiveYearEnd - fiveYearStart) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width1 = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(this.props.outcomes);
    
    const allOutcomes = this.props.outcomes
      .filter(outcome => outcome.range === 1825)
      .map((outcome, index) => {
      //find # of days until the outcome is to be reached
      const daysUntilOutcome1 = Math.abs((outcome.date - fiveYearStart) / 86400000);
      console.log(outcome.date);
      console.log(fiveYearStart);
      console.log(daysUntilOutcome1);
      //make a fraction to multiply the detected pixel count by
      const pixelFinderFractionX1 = daysUntilOutcome1/fiveYearPeriod;
      //get the x-axis positioning by multiplying the number of available
      //pixels by the fraction topp={top}
      const leftPositioning1 = Math.round(width1 * pixelFinderFractionX1);
      console.log(leftPositioning1);
     
      return <YearCard leftp={leftPositioning1}  outcomeInfo={outcome} key={index} />
    });

    console.log(allOutcomes);
    
    return (
    <div className="five-year-parent">
      <h2 className="five-year-header">Next 5 Years</h2>
      <div>{allOutcomes}</div>
    </div>
    );  
  }
}

/*
-in the Years Component there will always be 5 Year Components, each one
corresponding to single year in a 5 year plan, each year only needs the
YearCards that correspond to that year
-and also each year card needs to be assigned static dates
 <Year outcomes={this.props.outcomes} />

*/

