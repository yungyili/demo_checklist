import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signup} from '../actions/authActions';
import { withRouter } from 'react-router';
const validEmailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class SignUpForm extends Component {

  constructor(props){
    super(props);

    this.onSignUpClicked = this.onSignUpClicked.bind(this);
  }

  onSignUpClicked(values) {
    console.log("SignUpForm: signup: ", values);
    this.props.signup(values, this.props.history);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
      //TODO: submit button position will change due to showing of
      // the error message
      <div>
        <div>
          <label>{label}</label>
          <input {...input} placeholder={label} type={type}/>
          <div className="red-text">
            {　touched && error &&　<span>{error}</span>}
          </div>
        </div>
      </div>
    );

  render(){
    return (
      <div className="row">
        <form onSubmit={this.props.handleSubmit(this.onSignUpClicked)} className="col s6">
          <div className="input-field col s12">
              <Field
                name="username"
                component={this.renderField}
                type="text"
                label="user name"
              />
          </div>
          <div className="input-field col s12">
              <Field
                name="email"
                component={this.renderField}
                type="text"
                label="e-mail"
              />
          </div>
          <div className="input-field col s12">
              <Field
                name="password"
                component={this.renderField}
                type="password"
                label="password"
              />
          </div>

          <button className="btn col s12" type="submit">
            Signup
          </button>
          <div className="red-text">
            {this.props.user.error && "Failed to signup"}
          </div>

          <Link
            to="/"
            className="btn col s12 red darken-3"
            style={{marginTop:'15px'}}
          >
            cancel
          </Link>

        </form>
      </div>
    );
  }
}

function validate({email, password, username}){
  const errors = {};

  if(!email){
    errors['email'] = 'Required field';
  } else if (!validEmailRe.test(email)) {
    errors['email'] = 'Invalid email';
  }

  if(!password){
    errors['password'] = 'Required field';
  }

  if(!username){
    errors['username'] = 'Required field';
  }

  return errors;
}

function mapStateToProps(state){
  console.log("LoginForm: mapStateToProps: ",state);
  return {user: state.user};
}

export default reduxForm({
  form: 'signupForm', // a unique identifier for this form
  validate
})(
  connect(mapStateToProps,{signup})(
    withRouter(SignUpForm)
  )
)
