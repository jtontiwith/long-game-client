import React from 'react';
import './years.css';
import {connect} from 'react-redux';
import YearCard from './year-card';
import {getRange} from '../actions'; 


export class Years extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      styles: {}
    }
  }
  
  /* ===== START Timeframe Logic =====  
    1 - add a scroll eventListener that fires on scroll
    2 - because timeframes have fixed heights all we have to do is 
    determine how far the user has scrolled up or down the page using
    window.scrollY and assign a day range (i.e. is the user making a
    5 year outcome, 1 year outcome, 1 month outcome, etc.) for the 
    outcome being designed
    3 - we are doing this logic in the component instead of the action 
    because the passing the scrollY number into the action and doing 
    the logic there seems to make it choppy
  */

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll(event) {
    if(window.scrollY >= 0 && window.scrollY <= 100) {
      const range = 1825;
      console.log(window.scrollY);
      this.props.dispatch(getRange(range)); //
    } else if (window.scrollY >= 101 && window.scrollY <= 200) {
      const range = 365;
      this.props.dispatch(getRange(range));
    } else if (window.scrollY >= 201 && window.scrollY <= 300) {
      const range = 30;
      this.props.dispatch(getRange(range));
    } else if (window.scrollY >= 301 && window.scrollY <= 400) {
      const range = 7;
      this.props.dispatch(getRange(range));
    } else if (window.scrollY >= 401) {
      const range = 1;
      this.props.dispatch(getRange(range));
    }
  };

  /* ===== END Timeframe Logic =====  */
  
  render() {
    //5 year start
    const fiveYearStart = new Date();
    //5 year end
    const fiveYearEnd = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    // number of days in between 
    const fiveYearPeriod = Math.floor((fiveYearEnd - fiveYearStart) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width1 = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    const allOutcomes = this.props.outcomes
      .filter(outcome => outcome.range === 1825)
      .map((outcome, index) => {
      //find # of days until the outcome is to be reached
      let freshDate = new Date(outcome.date);
      const daysUntilOutcome1 = Math.round(Math.abs((freshDate - fiveYearStart) / 86400000));
      //console.log(freshDate);
      //console.log(outcome.date);
      //console.log(fiveYearStart);
      //console.log(daysUntilOutcome1);
      //make a fraction to multiply the detected pixel count by
      const pixelFinderFractionX1 = daysUntilOutcome1/fiveYearPeriod;
      //get the x-axis positioning by multiplying the number of available
      //pixels by the fraction topp={top}
      const leftPositioning1 = Math.round(width1 * pixelFinderFractionX1);
      //console.log(leftPositioning1);
      return <YearCard leftp={leftPositioning1} outcomeInfo={outcome} key={index} />
    });

    //console.log(`Outcomes for the 5YEAR ${allOutcomes}`);
    
    return (
      <div className={"five-year-parent " + (this.props.range === 1825 ? "time-highlight" : null) }>
      <h2 className="five-year-header">Next 5 Years</h2>
      <div>{allOutcomes}</div>
    </div>
    );  
  }
}

export default connect()(Years); //because I want to dispatch things from 
//the componnet, if I want to anything with redux I need to connect the


/*
-in the Years Component there will always be 5 Year Components, each one
corresponding to single year in a 5 year plan, each year only needs the
YearCards that correspond to that year
-and also each year card needs to be assigned static dates
 <Year outcomes={this.props.outcomes} />









*/

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