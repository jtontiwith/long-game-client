import React from 'react';
import {connect} from 'react-redux';
import './outcome-form.css';
import {deleteOutcome, updateOutcome, postOutcome, clearOutcome} from "../actions";

export class OutcomeForm extends React.Component {
  //local state for expanding/collapsing the form
  constructor(props) {
    super(props);  
    this.state = {
      editing: false
    }
    //presever scope
    this.onSubmit = this.onSubmit.bind(this); 
  }
  
  setEditing(editing, e) {
    e.preventDefault();
    this.setState({
      editing
    });
    //dispatch an action to clear the selectedOutcome
    this.props.dispatch(clearOutcome());
  }

  onSubmit(event) {
    event.preventDefault();
    const whatText = this.whatTextInput.value.trim();
    const whyText = this.whyTextInput.value.trim();
    const outcomeDate = new Date(this.outcomeDate.value.replace(/-/g, '\/')); 
    const range = this.props.range;
    const userId = this.props.userId;
    //pop different forms depending on what the user selected
    if(event.currentTarget.className === 'update-delete-form') {
      //here we are updateing an existing outcome
      const selectedId = this.props.selectedOutcome.getAttribute('id');
      this.props.dispatch(updateOutcome(whatText, whyText, outcomeDate, range, selectedId, userId));
      event.currentTarget.querySelectorAll('.update-delete-form .cancel-button')[0].click();
      //here we are posting and outcome for the first time
    } else if (event.currentTarget.className === 'add-form') { 
      this.props.dispatch(postOutcome(whatText, whyText, outcomeDate, range, userId))
      event.currentTarget.querySelectorAll('.add-form .cancel-button')[0].click();
    } 
  }

  handleDelete(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const selectedId = this.props.selectedOutcome.getAttribute('id');
    this.props.dispatch(deleteOutcome(selectedId, userId))
    event.currentTarget.previousSibling.click();
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }
  
  render() { 

    if(this.props.selectedOutcome) {
      //grabbing the individual values of the outcome the user selected 
      //so we can populate the form with them
      let children = this.props.selectedOutcome.childNodes;
      let selectedWhatText = children[0].childNodes[1].textContent;
      let selectedWhyText = children[0].childNodes[3].textContent; 
      let selectedDate = new Date(children[1].getAttribute('dateTime')).toISOString().substr(0,10);    
    
      //return form to edit outcome
      return (
        <form className="update-delete-form" onSubmit={this.onSubmit}>   
          <input type="text" className="what-input" ref={input => this.whatTextInput = input} aria-label={'What\'s your outcome?'} defaultValue={selectedWhatText} />
          <input type="text" className="why-input" ref={input => this.whyTextInput = input} aria-label={'Why?'} defaultValue={selectedWhyText} placeholder={`Why?`} />
          <input type="date" className="date-input" id="date" ref={input => this.outcomeDate = input} aria-label={'Commit to a date'} defaultValue={selectedDate} />
          <div className="form-buttons">
            <button className="update-button">Update</button>
            <button className="cancel-button cancel-btn-update-delete" type="button" onClick={(e) => this.setEditing(false, e)}>
              Cancel
            </button>
            <button onClick={this.handleDelete.bind(this)} className="delete-button">Delete</button>
          </div>
        </form>
      );
    }

    //return add outcome link
    if(!this.state.editing) {
      return (
        <div className="add-button">
          <a className="show-form-link" onClick={(e) => this.setEditing(true, e)} href="#">Add Outcome</a>
        </div>
      );
    } 
    
    //return form to post outcome
    if (this.state.editing) {
      let dateToday = new Date().toISOString().substr(0,10); 
      return (
        <form className="add-form" onSubmit={this.onSubmit}>   
          <input type="text" className="what-input"  ref={input => this.whatTextInput = input} aria-label={`Outcome?`} placeholder={`Outcome?`}/>
          <input type="text" className="why-input" ref={input => this.whyTextInput = input} aria-label={'Why?'} placeholder={`Why?`} />
          <input type="date" className="date-input" id="date" ref={input => this.outcomeDate = input} aria-label={'Commit to a date'} defaultValue={dateToday} />
          <div className="form-buttons">
            <button className="add-outcome-button">Add</button>
            <button className="cancel-button" type="button" onClick={(e) => this.setEditing(false, e)}>
              Cancel
            </button>
          </div>
        </form>
      );  
    } 
    
  }

}

export default connect()(OutcomeForm);