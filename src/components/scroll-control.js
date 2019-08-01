import React, { Fragment } from 'react';
import './scroll-control.css';
import { connect } from 'react-redux';


export default class ScrollControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: this.props.height,
      range: this.props.range
    }
  }
  
  static getDerivedStateFromProps(props) {
    return {
      scrollHeight: props.height,
      range: props.range
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    let whereToScroll = e.currentTarget.className;
    if(whereToScroll == 'goto-five-year') {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    } else if (whereToScroll == 'goto-one-year') {
      window.scroll({
        top: this.state.scrollHeight - 46,
        behavior: "smooth"
      });
    } else if(whereToScroll == 'goto-one-month') {
      window.scroll({
        top: this.state.scrollHeight*2 - 46,
        behavior: "smooth"
      });
    } else if(whereToScroll == 'goto-one-week') {
      window.scroll({
        top: this.state.scrollHeight*3 - 46,
        behavior: "smooth"
      });
    } else if(whereToScroll == 'goto-one-day') {
      window.scroll({
        top: this.state.scrollHeight*4 - 46,
        behavior: "smooth"
      });
    }
  }
  
  
  render() {    
    let styles;
    if(this.state.range == 1825) {
       // styles = {
        //  'backgroundColor': 'black',
       // }
      }
    let theDivHeight = this.props.height;
    console.log(theDivHeight);
    return(
      <Fragment>
        <ul className="time-nav-links" style={{paddingBottom: '15px'}}>
          <li className={"timeline-button " + (this.state.range === 1825 ? " time-highlight" : null) }>
            <a href="#" className="goto-five-year" onClick={this.handleClick}>5 Year</a>  
          </li>
          <li className={"timeline-button " + (this.state.range === 365 ? " time-highlight" : null) }>
            <a href="#" className="goto-one-year" onClick={this.handleClick}>This Year</a>  
          </li>
          <li className={"timeline-button " + (this.state.range === 30 ? " time-highlight" : null) }>
            <a href="#" className="goto-one-month" onClick={this.handleClick}>This Month</a>  
          </li>
          <li className={"timeline-button " + (this.state.range === 7 ? " time-highlight" : null) }>
            <a href="#" className="goto-one-week" onClick={this.handleClick}>This Week</a>  
          </li>
          <li className={"timeline-button " + (this.state.range === 1 ? " time-highlight" : null) }>
            <a href="#" className="goto-one-day" onClick={this.handleClick}>Today</a>  
          </li>
        </ul>
      </Fragment>
    );
  }
}

/*
const mapStateToProps = state => {
  console.log(state.data.height);
  
  return {
    height: state.data.height
  }
}

export default connect(mapStateToProps)(ScrollControl);
*/