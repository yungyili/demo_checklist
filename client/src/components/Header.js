import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import {login, logout} from '../actions';

class Header extends Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    console.log("onLogout");
    this.props.logout(this.props.history);
  }

  renderComponents(){
    const user = this.props.user;
    console.log("Header: user:", user);
    if(user.token){
      return [
        (<li key={1}>{user.email}</li>),
        (<li key={2}><a onClick={this.onLogout}>Logout</a></li>)
      ];
    }
    else {
      return;
    }
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.user.token?"/checklist-board":"/"} className="brand-logo">Genus</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderComponents()}
          </ul>
        </div>
      </nav>
    );
  };
}

function mapStateToProps(state){
  return {user: state.user};
}

export default connect(mapStateToProps, {login, logout})(
  withRouter(Header)
);
