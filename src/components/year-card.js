import React from 'react';
import './year-card.css';
import {connect} from 'react-redux';
import {getOutcome, clearOutcome} from '../actions';

export class YearCard extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(clearOutcome());
    let etarget = e.currentTarget
    setTimeout(() => { console.log(etarget); this.props.dispatch(getOutcome(etarget)) }, 1)
  }

  render() {
    //outcomes can appear differently if they are in the Today component and 
    //they have dynamic left positioning so we take care of that here
    let styles;
    if(this.props.outcomeInToday) {
        styles = {
          'fontSize': '18px',
          'width': '80%',
          'border': 'none',
          'backgroundColor': 'inherit',
          'boxShadow': 'none'
        }
      } else if (this.props.outcomeInWeek) {
        styles = {
          'width': '90%',
          'border': 'none',
          'backgroundColor': 'inherit',
          'boxShadow': 'none'
        }
      } else if (this.props.leftp) {
        styles = {
          position: 'absolute',
          left: this.props.leftp,
          'bottom': '70px'
        }
    } 

    return (
      <article id={this.props.outcomeInfo.id} onClick={(e) => this.handleClick(e)}  style={styles} className="outcome">
        <dl>
          <dt>What Outcome</dt>
          <dd>{this.props.outcomeInfo.whatText}</dd>
          <dt>Why</dt>
          <dd>{this.props.outcomeInfo.whyText}</dd>
        </dl>
        <time className="outcome-date" dateTime={this.props.outcomeInfo.date}>{this.props.outcomeInfo.date.toDateString()}</time>
      </article> 
    );  
  }
}

export default connect()(YearCard);