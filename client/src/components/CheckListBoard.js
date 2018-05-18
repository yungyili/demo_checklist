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
        <div key={item.content} style={{textOverflow:'ellipsis'}}>
          <i className="material-icons">{item.checked? 'check':'crop_square'}</i>
          <span>{item.content}</span>
        </div>
      );
    });
  }


  renderCheckList(checklist){ //TODO: make pics different for every checklist
    return (
      <div className="col s12 m4 l3" key={checklist.title}>
        <div className="card">
          <div className="card-image">
            <img src="https://source.unsplash.com/random" />
            <span className="card-title">{checklist.title}</span>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
          </div>
          <div className="card-content">
            <div>{this.renderChecklistItems(checklist.items)}</div>
          </div>
        </div>
      </div>
    );
  }

  renderCheckLists(checklists) {
    return (
      <div className="row">
        {checklists.map(checklist => this.renderCheckList(checklist))}
      </div>
    );
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
