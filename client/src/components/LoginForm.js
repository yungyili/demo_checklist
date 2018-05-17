import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../actions';
import { withRouter } from 'react-router';
const validEmailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class LoginForm extends Component {

  constructor(props){
    super(props);

    this.onLoginClicked = this.onLoginClicked.bind(this);
  }

  onLoginClicked(values) {
    console.log("LoginForm: login: ", values);
    this.props.login(values, this.props.history);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
      //TODO: submit button position will change due to showing of
      // the error message
      <div>
        <div>
          <input {...input} placeholder={label} type={type}/>
          <div className="red-text">
            {　touched && error &&　<span>{error}</span>}
          </div>
        </div>
      </div>
    );


  render () {
    return (
      <div className="row">
        <form onSubmit={this.props.handleSubmit(this.onLoginClicked)} className="col s6">
          <div className="input-field col s6">
              <Field
                name="email"
                component={this.renderField}
                type="text"
                label="e-mail"
              />
          </div>
          <div className="input-field col s6">
              <Field
                name="password"
                component={this.renderField}
                type="password"
                label="password"
              />
          </div>
          <button className="btn col s12" type="submit">
            Login
          </button>
          <div className="red-text">
            {this.props.user.error && "Invalid username or password"}
          </div>
        </form>
      </div>
    );
  };
}

function validate({email, password}){
  const errors = {};

  if(!email){
    errors['email'] = 'Required field';
  } else if (!validEmailRe.test(email)) {
    errors['email'] = 'Invalid email';
  }

  if(!password){
    errors['password'] = 'Required field';
  }

  return errors;
}

function mapStateToProps(state){
  console.log("LoginForm: mapStateToProps: ",state);
  return {user: state.user};
}

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate
})(
  connect(mapStateToProps,{login})(
    withRouter(LoginForm)
  )
)
