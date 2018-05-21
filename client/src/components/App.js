import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import CheckListBoard from './CheckListBoard';
import EditForm from './EditForm';
import SignUpForm from './SignUpForm';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/checklist-board" component={CheckListBoard} />
          <Route exact path="/edit/:id(\w+)" component={EditForm} />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
