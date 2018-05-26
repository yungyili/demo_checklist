import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LOGIN_OUT} from './actionTypes';
const mock = new MockAdapter(axios);

mock
  .onPost('/api/login')
  .reply(200,{token:'12345678'});

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

export const signup = (user, history) =>
  async (dispatch) => {
    var token = null;
    var error = null;
    var newUser = null;

    await axios.post('/api/user', user)
      .then((res)=>{
        newUser = res.data;
        console.log('signup: succeed: ', newUser);
        history.push('/');
      })
      .catch(e=>{
        console.log('signup: failed: ', e); //TODO: pass error message to page
        error = 'Failed to sign up';
      });

      dispatch({
        type: LOGIN_OUT,
        payload: {
          email: newUser.email,
          token: null,
          error: error
        }
      });
  };
