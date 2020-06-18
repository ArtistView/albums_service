import React from 'react';
import ReactDom from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import AlbumList from '../../client/components/AlbumList/AlbumList.jsx';

describe('AlbumList', () => {
  it('has album as a prop', () => {
    // fill in test later
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<AlbumList />);
    // make sure that as we add more props to album we ensure that they are correct here
    // console.log('album is', wrapper);
    expect(wrapper.exists()).toBe(true);
  });
})
