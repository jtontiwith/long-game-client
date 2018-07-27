import React from 'react';
import './time-range-tracker.css';

export default class TimeRangeTracker extends React.Component {
  render() {
    return (
      <form>   
        <label>
          <input type="radio" name="time-range" value="1825" /*checked={true}*/ />
          5 Year
        </label>
        <label>
          <input type="radio" name="time-range" value="365" />
          1 Year
        </label>
        <label>
          <input type="radio" name="time-range" value="30" />
          This Month
        </label>
        <label>
          <input type="radio" name="time-range" value="7" />
          This Week
        </label>
        <label>
          <input type="radio" name="time-range" value="1" />
          Today
        </label>
      </form>
    );  
    }
    
}