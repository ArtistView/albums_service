import React from 'react';
import ReactDom from 'react-dom';
import styled, { css } from 'styled-components';
import AlbumList from './components/AlbumList/AlbumList.jsx';

const MainAlbumsWrapper = styled.div`
  color: white;
  background-color: #151515;
  font-family: proxima-nova, sans-serif;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 90px;
`;
// margin-left: 232px;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '5eebdbf1bf2d490c13ff868d', // this is hardcoded but I should pull this state down from the url
      // artist: '5eebe7b2c451ef0e3f4c04f4', // another artist to use but this is has fewer albums
      albums: [], // set this initally to an empty array, represents the albums written by the artist
      features: [], // set to an empty array initially, represents the ablums that the artist appears on
      isLoaded: false, // used for conditional rendering to make sure the fetch has completed before rendering
      playing: '', // need to know which album is playing so all other albums can be set to stop playing
    };
    this.getAlbums = this.getAlbums.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
    this.playing = this.playing.bind(this);
    // this.updateAudio = this.updateAudio.bind(this);
  }

  componentDidMount() {
    this.getAlbums(this.state.artist);
    this.getFeatures(this.state.artist);
    // upon loading the app, we grab the albums and features of this artist and store them in the state
  }

  getAlbums(artist) {
    const url = `http://localhost:3273/albums/${artist}`;
    // calling a get request to pull down all the albums in the db that matches the artist
    // this only pulls down the albums that the artist is the primary artist for, not appears on
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          albums: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getFeatures(artist) {
    const url = `http://localhost:3273/albums/features/${artist}`;
    // calling a get request to pull down all the albums in the db whose featuredArtists array contains the artist
    // this only pulls down the albums that the artist appears on
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          features: data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  playing(album) {
    // this method will be passed as a prop to the lower components so they can change this global state
    // need to track which album is playing and be able to change it within the album component so no two albums can play at the same time
    this.setState({
      playing: album,
    });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <MainAlbumsWrapper id="main-albums-wrapper">
          <AlbumList type="Albums" albums={this.state.albums} playing={this.playing} currPlaying={this.state.playing} />
          <AlbumList type="Singles and EPs" albums={this.state.albums} playing={this.playing} currPlaying={this.state.playing} />
          <AlbumList type="Compilations" albums={this.state.albums} playing={this.playing} currPlaying={this.state.playing} />
          <AlbumList type="Appears On" albums={this.state.features} playing={this.playing} currPlaying={this.state.playing} />
        </MainAlbumsWrapper>
      );
    }
    return (
      <div />
    );
  }
}

export default App;
