import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Album from '../../client/components/Album/Album.jsx';
// import Adaptor from 'enzyme-adaptor-react-16';

// Enzyme.configure({ adaptor: new Adaptor() });

const album = {
  title: 'spongebob',
  firstSong: 'garbage.com',
  imageUrl: 'https://tinyurl.com/ya65klnb',
  key: 'abc',
  _id: '5eebdcc17b996d0c47797eb0',
};
const play = () => {
  console.log('mock play function');
}
describe('Album', () => {
  it('has album as a prop', () => {
    // fill in test later
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Album album={album} id={album._id} startPlaying={play} currPlaying={album._id} show={true} />);
    // make sure that as we add more props to album we ensure that they are correct here
    // console.log('album is', wrapper);
    expect(wrapper.exists()).toBe(true);
  });
  it('displays an album cover', () => {
    // TODO
  });
  it('changes opacity on hover and shows play button', () => {
    // TODO
  });
  it('displays an album title and underlines it on hover', () => {
    // TODO
  });
  // maybe add more tests about the state and props
})