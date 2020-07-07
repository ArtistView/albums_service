/**
 * @jest-environment jsdom
*/
import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Album from '../../client/components/Album/Album.jsx';
import {fetch} from 'whatwg-fetch';

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
  it('has state', () => {
    expect(wrapper.state('playing')).toBe(false);
    expect(wrapper.state('buttonIndex')).toBe(0);
    expect(wrapper.state('currSongIndex')).toBe(0);
  });
  it('recieves the correct props', () => {
    expect(wrapper.instance().props.album).toEqual(album);
    expect(wrapper.instance().props.id).toBe(album._id);
    expect(wrapper.instance().props.currPlaying).toBe(album._id);
    expect(wrapper.instance().props.startPlaying).toBe(noop);
    expect(wrapper.instance().props.show).toBe(true);
  });
  // the coverage is pretty low on this one but I pretty much cover all the rest of the lines and functions in my end to end testing through cypress
  // the play functionality is not really tested as inn actual spotify it would be abstracted out of my component
})