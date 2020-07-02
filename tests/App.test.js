/**
 * @jest-environment jsdom
*/
// import 'jsdom-global/register';
import React from 'react';
import ReactDom from 'react-dom';
import '../test-setup.js';
import { shallow, mount } from 'enzyme';
import App from '../client/App.jsx';
import AlbumList from '../../client/components/AlbumList/AlbumList.jsx';

describe('App', () => {
  it('renders correctly in \'debug mode\' ', () => {
    // TODO
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
  it('has at least one album list', () => {
    // TODO
    expect(wrapper.contains(AlbumList)).toBe(true);
  });
  // maybe add more tests about the state
});
