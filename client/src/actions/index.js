import axios from 'axios';
import {LOGIN_OUT} from './actionTypes';

export const login = (loginInfo, history) =>
  async (dispatch) => {
    var token = null;
    var error = null;
    const res = await axios.post('/api/login', loginInfo)
      .then((res)=>{
        token = res.data;
        history.push('/checklist-board');
        return res;
      })
      .catch(e=>{
        console.log("login failed");
        window.sessionStorage.user = {};
        history.push('/');
        error = true;
      });

      window.sessionStorage.user = {
        email: loginInfo.email,
        token: token,
        error: error
      };

      dispatch({
        type: LOGIN_OUT,
        payload: {
          email: loginInfo.email,
          token: token,
          error: error
        }
      });
  };

  export const logout = (history) =>
    async (dispatch) => {
      history.push('/');
      window.sessionStorage.user = null;

      dispatch({
        type: LOGIN_OUT,
        payload: {}
      });
    };
