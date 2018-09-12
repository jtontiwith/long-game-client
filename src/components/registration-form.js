import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import './login-form.css';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password')

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const {email, password} = values;
    const user = {email, password};
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(email, password)));
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.props.handleSubmit(values => 
        this.onSubmit(values)
      )}>
        <label className="hide" htmlFor="email">Email</label>
        <Field component={Input} type="email" name="email" placeholder="email" validate={[required, nonEmpty, isTrimmed]} />
        <label className="hide" htmlFor="password">Password</label>
        <Field component={Input} type="password" name="password" validate={[required, passwordLength, isTrimmed]} />
        <label className="hide" htmlFor="passwordConfirm">Confirm password</label>
        <Field component={Input} type="password" name="passwordConfirm" validate={[required, nonEmpty, matchesPassword]} />
        <button type="submit" className="log-reg-submit-btn" disabled={this.props.pristine || this.props.submitting}>
          Register
        </button> 
      </form>
    
    
    )

  }



}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);