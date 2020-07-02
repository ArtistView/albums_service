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
  const wrapper = shallow(<App />);
  it('renders correctly in \'debug mode\' ', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('has state', () => {
    expect(wrapper.state('artist')).toBe('5eebdbf1bf2d490c13ff868d');
    expect(wrapper.state('playing')).toBe('');
  });
  // it('has at least one album list', () => {
  //   // TODO
  //   expect(wrapper.contains(AlbumList)).toBe(true);
  // });
  // maybe add more tests about the state
});
