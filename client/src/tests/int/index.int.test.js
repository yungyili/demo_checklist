import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../components/App';
import reducers from '../../reducers';

Enzyme.configure({adapter: new Adapter()});

const store = createStore(
  reducers,
  {}, // initial state
  applyMiddleware(reduxThunk)
);

it('should render a placeholder when not loggin', () => {
    let wrapper = mount(<Provider store={store}><App /></Provider>);

    console.log("int test: ", wrapper.find('Field'));
    expect(wrapper.find('Field').length).toEqual(2);
});
