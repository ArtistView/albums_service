/**
 * @jest-environment jsdom
*/
import React from 'react';
import sinon from 'sinon';
import ReactDom from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import AlbumList from '../../client/components/AlbumList/AlbumList.jsx';
import Album from '../../client/components/Album/Album.jsx';

const albums = [
  {
    artistId: '5eebe7b2c451ef0e3f4c0533',
    featuredArtists: ['5eebdbf1bf2d490c13ff868d'],
    imageUrl: 'https://tinyurl.com/yc9dd4jq',
    songs: ['5eebfe07a386ca12ede16e2f', '5eebfe07a386ca12ede16e93', '5eebfe07a386ca12ede16e2f', '5eebfe07a386ca12ede16e93', '5eebfe07a386ca12ede16e2f', '5eebfe07a386ca12ede16e93'],
    title: 'aliquam',
    type: 'album',
    __v: 0,
    _id: '5eebecb1969c0a0fa4e0ce45',
  },
];
const noop = () => {};
describe('AlbumList', () => {
  const wrapper = shallow(<AlbumList type="Albums" albums={albums} playing={albums[0]._id} currPlaying={noop} />);
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AlbumList debug />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('has state', () => {
    expect(wrapper.state('type')).toBe('Albums');
    expect(wrapper.state('showMore')).toBe(false);
    expect(wrapper.state('showMoreText')).toBe('');
    expect(wrapper.state('showMoreArrow')).toBe('');
  });
  it('recieves the correct props', () => {
    expect(wrapper.instance().props.albums).toEqual(albums);
    expect(wrapper.instance().props.playing).toBe(albums[0]._id);
    expect(wrapper.instance().props.currPlaying).toBe(noop);
    expect(wrapper.instance().props.type).toBe("Albums");
  });
  // the coverage is ok on this one but I pretty much cover all the rest of the lines and functions in my end to end testing through cypress
});
