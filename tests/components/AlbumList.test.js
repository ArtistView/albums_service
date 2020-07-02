/**
 * @jest-environment jsdom
*/
import React from 'react';
import sinon from 'sinon';
import ReactDom from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import API mocking utilities from Mock Service Worker
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';

// // import react-testing methods
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// // add custom jest matchers from jest-dom
// import '@testing-library/jest-dom/extend-expect';
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
// configure({ adapter: new Adapter() });
// const { container, asFragment } = render(<AlbumList type="Albums" albums={albums} playing={albums[0]._id} currPlaying={noop} />);
describe('AlbumList', () => {
  const wrapper = shallow(<AlbumList type="Albums" albums={albums} playing={albums[0]._id} currPlaying={noop} />);
  // const wrapper = mount(<AlbumList type="Albums" albums={albums} playing={albums[0]._id} currPlaying={noop} />);
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AlbumList debug />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    // const component = mount(<CommunityDetails listing={fakeData.communityAndNeighborhoodDetails} />);
    expect(wrapper).toMatchSnapshot();
  });
  // the coverage is ok on this one but I pretty much cover all the rest of the lines and functions in my end to end testing through cypress
});
