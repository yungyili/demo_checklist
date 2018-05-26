import configureMockStore from 'redux-mock-store';
import * as actions from './authActions';
import * as types from './actionTypes';
import expect from 'expect';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to login', () =>{
    const email = 'test@test.com';
    const history = {};
    history.push = ()=>{};

    const expectedActions = [{
      type: types.LOGIN_OUT,
      payload: {
        email: email,
        token: '12345678',
        error: null
      }
    }];
    const store = mockStore({user:{}});

    return store.dispatch(actions.login({email:email}, history)).then(()=>{
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

})
