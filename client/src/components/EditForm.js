import React, {Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {submitChecklist, fetchCheckList} from '../actions/checklistActions';
import axios from 'axios';

class EditForm extends Component {

  constructor(props){
    super(props);
    this.state = this.emptyList();
    this.changeNewContent = this.changeNewContent.bind(this);
  }

  emptyList () {
    return {
      checklist: { title:'', items:[]},
      error: false,
      initializing: true
    };
  }

  onSave = (event) => {
    this.props.submitChecklist(this.state.checklist);
    this.props.history.push('/checklist-board');
  }


  async componentDidMount(){
    console.log("EditForm: get checklist:", this.props.match.params.id);
    const token = sessionStorage.getItem('jwtToken');
    await axios
      .get(`/api/checklist/${this.props.match.params.id}`, {
        headers: { Authorization: `JWT ${token}` }
      })
      .then(res => {
        console.log("componentDidMount: fetched data:", res.data);
        this.setState({
          checklist: res.data,
          error: false,
          initializing: false
        });
      })
      .catch(err => {
        console.log("componentDidMount: fetched data falied:", err);
        this.setState({
          checklist: { title:'', items:[]},
          error: true,
          initializing: false
        });
      });
  }

  changeNewContent (index, event) {
      const newState = {...this.state};
      newState.checklist.items[index].content = event.target.value;
      this.setState(newState);
  }


  renderItems(){
    return this.state.checklist.items.map((item, index, array)=>{
      //console.log("renderItems: item:",index, item);
      return (
        <li key={index} className="row">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">{item.checked? "done":"crop_square"}</i>
                  <input
                    type="text"
                    placeholder='Description'
                    value={this.state.checklist.items[index].content || ""}
                    onChange={(event)=>this.changeNewContent(index, event)}
                  />
                </div>
              </div>
            </form>
          </div>
        </li>
      );
    });
  }

  render(){
    if (this.state.initializing){
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <h2>{this.state.checklist.title}</h2>
        <ul>
          {this.renderItems()}
        </ul>
        <Link
          to='/checklist-board'
          className="btn red darken-3"
          style={{margin:'20px'}}
        >
          cancel
        </Link>
        <button
          onClick={this.onSave}
          type="button blue darken-1"
          className="btn "
        >
          save
        </button>
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
