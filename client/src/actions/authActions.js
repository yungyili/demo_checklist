import axios from 'axios';
import {LOGIN_OUT} from './actionTypes';

export const login = (loginInfo, history) =>
  async (dispatch) => {
    var token = null;
    var error = null;
    await axios.post('/api/login', loginInfo)
      .then((res)=>{
        token = res.data.token;
        console.log('login: set jwtToken: ', token);
        sessionStorage.setItem('jwtToken', token);
        history.push('/checklist-board');
      })
      .catch(e=>{
        console.log("login failed");
        sessionStorage.removeItem('jwtToken');
        history.push('/');
        error = true;
      });

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
      sessionStorage.removeItem('jwtToken');

      dispatch({
        type: LOGIN_OUT,
        payload: {}
      });
    };
