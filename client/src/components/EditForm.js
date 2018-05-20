import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {submitChecklist, fetchCheckList} from '../actions/checklistActions';

class EditForm extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("EditForm: get checklist:", this.props.match.params.id);
    this.props.fetchCheckList(this.props.match.params.id);
  }

  getCurrentChecklist(){

    return this.props.checklists[this.props.match.params.id];
  }

  renderItems(checklist){
    return checklist.items.map(item=>{
      console.log("renderItems: item:", item);
      return (
        <tr key={item.content}>
          <td>{item.content}</td>
          <td>{item.checked? "Yes":"No"}</td>
        </tr>
      );
    });
  }

  render(){
    console.log("EditForm: checklist:", this.props.checklists);
    if (!this.getCurrentChecklist()) {
      return (<div>Loading...</div>);
    }

    const checklist = this.getCurrentChecklist();

    return (
      <div>
        <h2>{checklist.title}</h2>
        <table>
          <thead>
            <tr>
                <th>Description</th>
                <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems(checklist)}
          </tbody>
        </table>
        <Link
          to='/checklist-board'
          className="btn"
          style={{margin:'20px'}}
        >
          Back
        </Link>
      </div>
    );
  }
}


function mapStateToProps(state){
  console.log("EditForm: mapStateToProps: ",state);
  return {
    checklists: state.checklists
  };
}

export default connect(mapStateToProps,{submitChecklist, fetchCheckList})(
    withRouter(EditForm)
  )
