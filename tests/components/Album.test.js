/**
 * @jest-environment jsdom
*/
import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Album from '../../client/components/Album/Album.jsx';
import {fetch} from 'whatwg-fetch';
// import Adaptor from 'enzyme-adaptor-react-16';

// Enzyme.configure({ adaptor: new Adaptor() });

const album = {
  title: 'spongebob',
  firstSong: 'garbage.com',
  imageUrl: 'https://tinyurl.com/ya65klnb',
  key: 'abc',
  _id: '5eebdcc17b996d0c47797eb0',
};
const noop = () => {};
describe('Album', () => {
  const wrapper = shallow(<Album album={album} key={album._id} id={album._id} startPlaying={noop} currPlaying={album._id} show={true} />);
  it('should render correctly with props', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('changes opacity on hover and shows play button', () => {
    // TODO
  });
  it('displays an album title and underlines it on hover', () => {
    // TODO
  });
  // the coverage is pretty low on this one but I pretty much cover all the rest of the lines and functions in my end to end testing through cypress
  // the play functionality is not really tested as inn actual spotify it would be abstracted out of my component
})