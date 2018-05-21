import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {submitChecklist, fetchCheckList, deleteChecklist} from '../actions/checklistActions';
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

    if (this.props.match.params.id === "new") {
      this.setState({initializing: false});
      return;
    }

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

  toggleCheckbox = (index, event) => {
    const newState = {...this.state};
    newState.checklist.items[index].checked = !this.state.checklist.items[index].checked;
    this.setState(newState);
  }

  changeNewTitle (event) {
      const newState = {...this.state};
      newState.checklist.title = event.target.value;
      this.setState(newState);
  }

  addNewItem (event) {
      const newState = {...this.state};
      newState.checklist.items.push({checked: false, content: ''});
      this.setState(newState);
  }

  deleteItem (index) {
      const newState = {...this.state};
      newState.checklist.items.splice(index, 1);
      this.setState(newState);
  }

  deleteChecklist (index) {
      this.props.deleteChecklist(this.state.checklist._id);
      this.props.history.push('/checklist-board');
  }


  renderItems(){
    return this.state.checklist.items.map((item, index, array)=>{
      //console.log("renderItems: item:",index, item);
      return (
        <li key={index} className="row">
          <div className="row">
            <div className="input-field col s12">
              <i
                onClick={(event)=>this.toggleCheckbox(index, event)}
                className="material-icons prefix"
              >
                {item.checked? "done":"crop_square"}
              </i>
              <input
                type="text"
                placeholder='Description'
                value={this.state.checklist.items[index].content || ""}
                onChange={(event)=>this.changeNewContent(index, event)}
              />
              <i
                onClick={(event)=>this.deleteItem(index)}
                className="material-icons prefix"
              >
                delete
              </i>

            </div>
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
        <div>
          <div className="input-field col s6">
            <input
              type="text"
              placeholder='Title'
              value={this.state.checklist.title || ""}
              onChange={(event)=>this.changeNewTitle(event)}
            />
          </div>
        </div>

        <ul>
          {this.renderItems()}
          <li key="add-new-item">
            <button
              onClick={(event)=>this.addNewItem(event)}
              to="/edit/new"
              className="btn-floating btn-large waves-effect waves-light red right"
            >
              <i className="material-icons">add</i>
            </button>
          </li>
        </ul>
        <button
          style={{margin:'10px'}}
          onClick={(event)=>this.deleteChecklist(event)}
          to="/"
          className="btn green darken-3"
        >
          delete
        </button>
        <Link
          to='/checklist-board'
          className="btn red darken-3"
          style={{margin:'10px'}}
        >
          cancel
        </Link>
        <button
          style={{margin:'10px'}}
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

export default connect(mapStateToProps,{submitChecklist, fetchCheckList, deleteChecklist})(
    withRouter(EditForm)
  )
