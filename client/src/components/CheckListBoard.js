import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCheckLists} from '../actions/checklistActions';

class CheckListBoard extends Component {

  componentDidMount(){
    this.props.fetchCheckLists();
  }

  renderChecklistItems(items){
    return items.map(item=>{
      return (
        <div key={item.content}>
          <i className="material-icons">check</i>
          <span>{item.content}</span>
        </div>
      );
    });
  }

  renderCheckList(checklist){
    return (
      <div key={checklist.title}>
        <h3>{checklist.title}</h3>
        <div>{this.renderChecklistItems(checklist.items)}</div>
      </div>
    );
  }

  renderCheckLists(checklists){
    return checklists.map(checklist => this.renderCheckList(checklist));
  }

  render () {
    if (!this.props.checklists.content) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.renderCheckLists(this.props.checklists.content)}
      </div>
    );
  };
}

function mapStateToProps(state){
  return {checklists: state.checklists};
}

export default connect(mapStateToProps, {fetchCheckLists})(CheckListBoard);
