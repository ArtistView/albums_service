import React from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import AlbumList from '../../client/components/AlbumList/AlbumList.jsx';

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
// const getAlbums = () => {
//   const url = 'http://localhost:3273/albums/5eebdbf1bf2d490c13ff868d';
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       // console.log('albums data', data);
//       albums = data;
//       // console.log('albums state', this.state.albums);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };
// getAlbums();
describe('AlbumList', () => {
  it('has album as a prop', () => {
    // fill in test later
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<AlbumList albums={albums} />);
    // make sure that as we add more props to album we ensure that they are correct here
    // console.log('album is', wrapper);
    expect(wrapper.exists()).toBe(true);
  });
  // implement snapshot testing once I know more what it is going to look like
  // once I implement show more/less feature use a test structure like the one below to check it
  // expect(wrapper.text()).toEqual('Show More');
  // wrapper.find('showMore').simulate('change');
  // expect(wrapper.text()).toEqual('Show Less');
});
