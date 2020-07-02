/**
 * @jest-environment jsdom
*/
// import 'jsdom-global/register';
import React from 'react';
import ReactDom from 'react-dom';
import '../test-setup.js';
import { shallow, mount } from 'enzyme';
import App from '../client/App.jsx';
import AlbumList from '../client/components/AlbumList/AlbumList.jsx';
import {fetch} from 'whatwg-fetch';

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
});
