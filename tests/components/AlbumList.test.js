import React from 'react';
import ReactDom from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import AlbumList from '../AlbumList';

// import { isTSAnyKeyword } from '@babel/types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<AlbumList />, div);
  // not working with jsx for some reason, also need to add in a test script
});
