import userReducer from './userReducer';

const initialState = {};



describe ('user reducer', () => {
  it('returns the initial state', ()=>{
    expect(userReducer(undefined, {})).toEqual(initialState);
  });
});
