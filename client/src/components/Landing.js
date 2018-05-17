import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Landing extends Component {

  render () {
    return (
      <div>
        <h2>Welcome</h2>
        <LoginForm />
      </div>
    );
  };
}

export default Landing;
