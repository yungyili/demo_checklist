import axios from 'axios';
import {
  FETCH_CHECKLISTS,
  FETCH_CHECKLIST,
  SUBMIT_CHECKLIST,
  DELETE_CHECKLIST } from './actionTypes';

export const fetchCheckLists = () =>
  async (dispatch) => {
    const token = sessionStorage.getItem('jwtToken');
    await axios
      .get('/api/checklists', {
        headers: { Authorization: `JWT ${token}` }
      })
      .then(res => {
        dispatch({
          type: FETCH_CHECKLISTS,
          payload: {
            content: res.data,
            error: ''
          }
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_CHECKLISTS,
          payload: {
            content: {},
            error: 'Failed to retrieve checklist'
          }
        });
      });
    };

export const fetchCheckList = (id) =>
  async (dispatch) => {
    const token = sessionStorage.getItem('jwtToken');
    await axios
      .get(`/api/checklist/${id}`, {
        headers: { Authorization: `JWT ${token}` }
      })
      .then(res => {
        dispatch({
          type: FETCH_CHECKLIST,
          payload: {
            content: res.data,
            error: ''
          }
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_CHECKLIST,
          payload: {
            content: {},
            error: 'Failed to retrieve checklist'
          }
        });
      });
    };

export const submitChecklist = (checklist) =>
  async (dispatch) => {
    console.log("submitChecklist: checklist=", checklist);
    const token = sessionStorage.getItem('jwtToken');
    await axios({
        method: 'post',
        url: '/api/checklist',
        headers: { Authorization: `JWT ${token}` },
        data: checklist
      })
      .then(res => {
        dispatch({
          type: SUBMIT_CHECKLIST,
          payload: {
            content: res.data,
            error: ''
          }
        });
      })
      .catch(err => {
        console.log("submitChecklist: failed: err=",err);
        dispatch({
          type: SUBMIT_CHECKLIST,
          payload: {
            content: {},
            error: 'Failed to submit checklist'
          }
        });
      });
    };

export const deleteChecklist = (_id) =>
  async (dispatch) => {
    console.log("deleteChecklist: _id=", _id);
    const token = sessionStorage.getItem('jwtToken');
    await axios({
        method: 'delete',
        url: '/api/checklist',
        headers: { Authorization: `JWT ${token}` },
        data: {_id: _id}
      })
      .then(res => {
        console.log("deleteChecklist: succeed: res=",res);
        dispatch({
          type: DELETE_CHECKLIST,
          payload: {
            content: _id,
            error: ''
          }
        });
      })
      .catch(err => {
        console.log("deleteChecklist: failed: err=",err);
        dispatch({
          type: DELETE_CHECKLIST,
          payload: {
            content: _id,
            error: 'Failed to delete checklist'
          }
        });
      });
    };
