import React from 'react';
import './year-card.css';
import {connect} from 'react-redux';
import {getOutcome} from '../actions';

export class YearCard extends React.Component {
  handleClick(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    this.props.dispatch(getOutcome(e.currentTarget));
  }


  render() {
    
    let styles = {
      position: 'absolute',
      top: this.props.topp,
      left: this.props.leftp
    }

    //console.log(this.props.outcomeInfo); onClick={(e) => this.props.outcomeGrabber(e)}
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