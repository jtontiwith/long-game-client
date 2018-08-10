import React from 'react';
import './year-card.css';

export default class YearCard extends React.Component {
  
  render() {
    
    let styles = {
      position: 'absolute',
      top: this.props.topp,
      left: this.props.leftp
    }
    //console.log(this.props.outcomeInfo);
    return (
      <article id={this.props.outcomeInfo.id} onClick={(e) => this.props.outcomeGrabber(e)} style={styles} className="outcome">
        <dl>
          <dt>What Outcome</dt>
          <dd>{this.props.outcomeInfo.whatText}</dd>
          <dt>Why</dt>
          <dd>{this.props.outcomeInfo.whyText}</dd>
        </dl>
        <time dateTime={this.props.outcomeInfo.date}></time>
      </article> 
    );  
  }
}
