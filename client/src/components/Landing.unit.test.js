import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Landing from './Landing';

Enzyme.configure({adapter: new Adapter()});

function setup(){

  const enzymeWrapper = shallow(<Landing />);
  return { enzymeWrapper };
}

describe('components', () =>{
  describe('Landing', () => {
    it('should render self and subcomponents', ()=>{
      const {enzymeWrapper} = setup();
      expect(enzymeWrapper.find('h2').text()).toBe('Welcome');
      expect(enzymeWrapper.find('LoginForm')).toBeDefined();
    });
  });
});
