import React from 'react';
import './years.css';
import { connect } from 'react-redux';
import YearCard from './year-card';
import {getRange} from '../actions'; 


export class Years extends React.Component {
  constructor(props) {
    super(props);
    this.myFiveYearParentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("load", function(event) {
      const refedComponent = document.querySelector("#five-year-parent");
      createObserver(refedComponent);
    }, false);
  
    function createObserver(refedComponent) {
      let observer;
    
      const options = {
        root: null,
        //rootMargin: "0px",
        threshold: .9
      };
    
      observer = new IntersectionObserver(callback, options);
      observer.observe(refedComponent);
    }
    
    var callback = (entries, observer) => { 
      entries.forEach(entry => {
        if(entry.intersectionRatio > .8) {
          console.log('5 year component in view here!')
          const range = 1825;
          this.props.dispatch(getRange(range));
        }
        
        
      });
    }; 


  }
  



  render() {
    
    //5 year start
    const fiveYearStart = new Date(this.props.startDate);
    //5 year end
    const fiveYearEnd = new Date(this.props.endDate)
    // number of days in between 
    const fiveYearPeriod = Math.floor((fiveYearEnd - fiveYearStart) / 86400000);
    //pixel width I have to work with (crossbrowswer)
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //if the width of the screen changes then grab it from props and use it for the positioning calc
    const dynamicWidth = this.props.width !== undefined ? this.props.width : width;

    const allOutcomes = this.props.outcomes
      .filter(outcome => outcome.date >= fiveYearStart && outcome.date <= fiveYearEnd && outcome.range === 1825)
      .map((outcome, index) => {
      //find # of days until the outcome is to be reached
      const daysUntilOutcome1 = Math.round(Math.abs((outcome.date - fiveYearStart) / 86400000));
      //make a fraction to multiply the detected pixel count by
      const pixelFinderFractionX1 = daysUntilOutcome1/fiveYearPeriod;
      //get the x-axis positioning by multiplying the number of available
      //pixels by the fraction topp={top}
      let leftPositioning = Math.round(dynamicWidth * pixelFinderFractionX1);
      //hack/fix to ensure outcomes at the end of periods don't run off screen
      if(leftPositioning >= (width - 50)) {
        leftPositioning = width - 80;
      }
      
      return <YearCard leftp={leftPositioning} outcomeInfo={outcome} key={index} />
    });
   
    return (
      <div ref={this.myFiveYearParentRef} id="five-year-parent" className={"five-year-parent" /*+ (this.props.range === 1825 ? " time-highlight" : null)*/ }>
        <span className="dates start-date">{fiveYearStart.toDateString().slice(3)}</span>
        <span className="dates end-date">{fiveYearEnd.toDateString().slice(3)}</span>
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




*/