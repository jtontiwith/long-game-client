import React from 'react';
import {connect} from 'react-redux';
import './outcome-form.css';
import {deleteOutcome, updateOutcome, postOutcome} from "../actions";

export class OutcomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  
    this.onSubmit = this.onSubmit.bind(this); //what does this do
    //binding, making sure this is going to be this, and not 
    //we are preserving the scope 
    
  }
  
  setEditing(editing) {
    this.setState({
      editing
    });
  }



  onSubmit(event) {
    event.preventDefault();
    const whatText = this.whatTextInput.value.trim();
    const whyText = this.whyTextInput.value.trim();
    const outcomeDate = new Date(this.outcomeDate.value.replace(/-/g, '\/')); 
    const range = this.props.range;
    //console.log(event.currentTarget.childNodes[3].className);
    //console.log(event.currentTarget.lastChild.className)
    if(event.currentTarget.className === 'update-delete-form') {
      //here we are updateing an existing outcome
      const selectedId = this.props.selectedOutcome.getAttribute('id');
      this.props.dispatch(updateOutcome(whatText, whyText, outcomeDate, range, selectedId));
      //here we are posting and outcome for the first time
    } else if (event.currentTarget.className === 'add-form') { 
      this.props.dispatch(postOutcome(whatText, whyText, outcomeDate, range));
    } 
    //console.log(`Here's the whatText ${whatText} and whyText ${whyText} and the date ${outcomeDate}`);
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }

  handleDelete(event) {
    event.preventDefault();
    const selectedId = this.props.selectedOutcome.getAttribute('id');
    this.props.dispatch(deleteOutcome(selectedId))
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }
  
  render() {
    
    if(this.props.selectedOutcome) {
      
      let children = this.props.selectedOutcome.childNodes;
      let selectedWhatText = children[0].childNodes[1].textContent;
      let selectedWhyText = children[0].childNodes[3].textContent; 
      let selectedDate = new Date(children[1].getAttribute('dateTime')).toISOString().substr(0,10);    
      
      return (
        <form className="update-delete-form" onSubmit={this.onSubmit}>   
          <input type="text" ref={input => this.whatTextInput = input} aria-label={'What\'s your outcome?'} defaultValue={selectedWhatText} />
          <input type="text" ref={input => this.whyTextInput = input} aria-label={'Why?'} defaultValue={selectedWhyText} />
          <input type="date" id="date" ref={input => this.outcomeDate = input} aria-label={'Commit to a date'} defaultValue={selectedDate} />
          <button className="update-button">Update</button>
          <button type="button" onClick={() => this.setEditing(false)}>
            Cancel
          </button>
          <button onClick={this.handleDelete.bind(this)} className="delete-button">Delete</button>
        </form>
      )
    }

    if(!this.state.editing) {
      return (
        <div className="add-button"
          onClick={() => this.setEditing(true)}>
          <a className="show-form-link" href="#">Add Outcome</a>
        </div>
      );
    } 
    
    if (this.state.editing) {
      let dateToday = new Date().toISOString().substr(0,10); 
      return (
        <form className="add-form" onSubmit={this.onSubmit}>   
          <input type="text" ref={input => this.whatTextInput = input} aria-label={'What\'s your outcome?'} placeholder={`What's your outcome?`}/>
          <input type="text" ref={input => this.whyTextInput = input} aria-label={'Why?'} placeholder={`Why?`} />
          <input type="date" id="date" ref={input => this.outcomeDate = input} aria-label={'Commit to a date'} defaultValue={dateToday} />
          <button>Add</button>
          <button type="button" onClick={() => this.setEditing(false)}>
            Cancel
          </button>
        </form>
      );  
    } 
    
  }    
}

export default connect()(OutcomeForm);
/*

<button>Delete</button>
          <button type="button" onClick={() => this.setEditing(false)}>
            Cancel
          </button>

          if(whatText && outcomeDate && this.props.onAdd) {
      this.props.onAdd(whatText, whyText, outcomeDate, range)
    }


*/