import React from 'react';
import './timelines.css'
import Years from './years';
import Year from './year';
import Month from './month';
import Week from './week';
import Today from './today';

export default class Timelines extends React.Component {
  render() {
    
    return (
     <div>
      <Years outcomes={this.props.outcomes} />
      <Year outcomes={this.props.outcomes} />
      <Month outcomes={this.props.outcomes} />
      <Week outcomes={this.props.outcomes} />
      <Today outcomes={this.props.outcomes} />
    </div>
    );  
  }
}

/*
Inside the Timeline Component there will always be only 1 Years Component
and inside the Years Component there will always be 5 Year Components and 
inside the Year Component there could be any number of Year Card Components



*/