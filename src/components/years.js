import React from 'react';
import './years.css';
import Year from './year'

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
    console.log(this.props.outcomes[0].date)
    
    /*for(let i = 0; i < this.props.outcomes; i++) {
      console.log(this.props.outcomes[i].date)
    }*/

    /*
    I have one array that's always 
    const fiveYears = []
    
    console.log(this.props.dates);
    console.log(this.props.outcomes);

    const fiveDates = []
    this.props.dates.forEach(date => fiveDates.push(date));
    console.log(fiveDates);

 this.props.dates.forEach((date, index) => {
     return fiveYears.push(<Year outcomes={this.props.outcomes} yearEnd={date} key={index} />);
    });
    */

   const fiveYears = []





   this.props.dates.forEach((date, index) => {
    return fiveYears.push(<Year outcomes={this.props.outcomes} yearEnd={date} key={index} />);
   });

   



    /*
    //it's just a simple if statement I think
    this.props.dates.forEach((date, index) => {
      this.props.outcomes.forEach(outcome => {
        if(outcome.date < date) {
          fiveYears.push(<Year outcomes={outcome} yearEnd={date} key={index} />);
        }
      })
      //fiveYears.push(<Year outcomes={this.props.outcomes} yearEnd={date} key={index} />);
    
    })*/
    
    /*
    this.props.outcomes.filter(outcome => {
    return outcome.date < date
    });
    */
     

    return (
      <div>
        {fiveYears}
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

