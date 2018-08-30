import React from 'react';
import {connect} from 'react-redux';
import './outcome-form.css';
import {deleteOutcome, updateOutcome, postOutcome, clearOutcome} from "../actions";


export class OutcomeForm extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      editing: false
    }
  
    this.onSubmit = this.onSubmit.bind(this); //what does this do
    //binding, making sure this is going to be this, and not 
    //we are preserving the scope 
    console.log(this.state);
  }
  
  setEditing(editing, e) {
    e.preventDefault();
    this.setState({
      editing
    });
    //dispatch an action to clear the selectedOutcome or set it to false
    this.props.dispatch(clearOutcome());
    console.log(this.state.editing)
  }



  onSubmit(event) {
    event.preventDefault();
    const whatText = this.whatTextInput.value.trim();
    const whyText = this.whyTextInput.value.trim();
    const outcomeDate = new Date(this.outcomeDate.value.replace(/-/g, '\/')); 
    const range = this.props.range;
    const userId = this.props.userId;
    //console.log(event.currentTarget.childNodes[3].className);
    //console.log(event.currentTarget.lastChild.className)
    if(event.currentTarget.className === 'update-delete-form') {
      //here we are updateing an existing outcome
      const selectedId = this.props.selectedOutcome.getAttribute('id');
      this.props.dispatch(updateOutcome(whatText, whyText, outcomeDate, range, selectedId, userId));
      //here we are posting and outcome for the first time
    } else if (event.currentTarget.className === 'add-form') { 
      this.props.dispatch(postOutcome(whatText, whyText, outcomeDate, range, userId))
    } 
    //console.log(`Here's the whatText ${whatText} and whyText ${whyText} and the date ${outcomeDate}`);
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }

  handleDelete(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const selectedId = this.props.selectedOutcome.getAttribute('id');
    this.props.dispatch(deleteOutcome(selectedId, userId))
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }
  
  render() {
    /*if(this.props.selectedOutcome) {
      this.state = {
        editing: false
      }
      
    }  
    this is probably all happening b/c I am not using redux
    
    What's the problem?
    The cancel button on the update-delete-form doesn't work the same
    as it does on the add-form 

    Why isn't it working?
    if there's no this.props.selectedOutcome then we return a di
    
    
    
    
    */
    
    
    
    console.log(this.props.selectedOutcome);
    if(this.props.selectedOutcome) {
      
      let children = this.props.selectedOutcome.childNodes;
      let selectedWhatText = children[0].childNodes[1].textContent;
      let selectedWhyText = children[0].childNodes[3].textContent; 
      let selectedDate = new Date(children[1].getAttribute('dateTime')).toISOString().substr(0,10);    
      
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
      )
      
    }

    if(!this.state.editing) {
      return (
        <div className="add-button" onClick={(e) => this.setEditing(true, e)}>
          <a className="show-form-link" href="#">Add Outcome</a>
        </div>
      );
    } 
    
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
/*

<button>Delete</button>
          <button type="button" onClick={() => this.setEditing(false)}>
            Cancel
          </button>

          if(whatText && outcomeDate && this.props.onAdd) {
      this.props.onAdd(whatText, whyText, outcomeDate, range)
    }


*/