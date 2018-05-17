import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import CheckListBoard from './CheckListBoard';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/checklist-board" component={CheckListBoard} />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
