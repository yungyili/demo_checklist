import axios from 'axios';
import { FETCH_CHECKLISTS } from './actionTypes';

export const fetchCheckLists = () =>
  async (dispatch) => {
    const token = sessionStorage.getItem('jwtToken');
    await axios
      .get('/api/checklist', {
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
            content: [],
            error: 'Failed to retrieve checklist'
          }
        });
      });
    };
