import React from 'react';
import './outcome-form.css';

export default class OutcomeForm extends React.Component {
  
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
    const range = 1825;
    console.log(event.currentTarget.childNodes[3].className);
    if(event.currentTarget.childNodes[3].className === 'update-button') {
      //here we are updateing an existing outcome
      const selectedId = this.props.selectedOutcome.getAttribute('id');
      this.props.onUpdate(whatText, whyText, outcomeDate, range, selectedId)
      console.log(selectedId);
      //here we are posting and outcome for the first time
    } else if (event.currentTarget.className === 'add-form') {
      this.props.onAdd(whatText, whyText, outcomeDate, range)
    } else if (event.currentTarget.lastChild.className === 'delete-button') {
      console.log('delte started running from console')
      const selectedId = this.props.selectedOutcome.getAttribute('id');
      this.props.onDelete(selectedId);
      
    }
    console.log(`Here's the whatText ${whatText} and whyText ${whyText} and the date ${outcomeDate}`);
    this.whatTextInput.value = '';
    this.whyTextInput.value = '';
  }

 //ha
  
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
          <button className="delete-button">Delete</button>
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


/*

<button>Delete</button>
          <button type="button" onClick={() => this.setEditing(false)}>
            Cancel
          </button>

          if(whatText && outcomeDate && this.props.onAdd) {
      this.props.onAdd(whatText, whyText, outcomeDate, range)
    }


*/