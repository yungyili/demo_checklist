import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
      <div className="col s12 m4 l3" key={checklist.createDate}>
        <div className="card">
          <div className="card-image">
            <img src="https://source.unsplash.com/random" alt="random pics" />
            <span className="card-title">{checklist.title}</span>
            <Link
              to={`/edit/${checklist._id}`}
              className="btn-floating halfway-fab waves-effect waves-light red"
            >
              <i className="material-icons">edit</i>
            </Link>
          </div>
          <div className="card-content">
            <div>{this.renderChecklistItems(checklist.items)}</div>
          </div>
        </div>
      </div>
    );
  }



  renderCheckLists(checklists) {
    var ret = [];
    _.forOwn(
      checklists,
      (checklist, _id) => {
        ret.push(this.renderCheckList(checklist));
      }
    );

    return (
      <div className="row">
        {ret}
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
        <div>
          <Link
            to="/edit/new"
            className="btn-floating btn-large waves-effect waves-light red right"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state){
  return {checklists: state.checklists};
}

export default connect(mapStateToProps, {fetchCheckLists})(CheckListBoard);
