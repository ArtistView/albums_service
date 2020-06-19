import React from 'react';
import ReactDom from 'react-dom';
import AlbumList from './components/AlbumList/AlbumList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '5eebdbf1bf2d490c13ff868d', // this is hardcoded but I should pull this state down from the url
      albums: [], // set this initally to an empty array, represents the albums written by the artist
      features: [], // set to an empty array initially, represents the ablums that the artist appears on
      isLoaded: false,
    };
    this.getAlbums = this.getAlbums.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
  }

  componentDidMount() {
    this.getAlbums(this.state.artist);
    this.getFeatures(this.state.artist);
    // console.log(this.state);
    // the state is not setting correctly here but it is logging correctly within the getAlbums method, so idk
    // props are not being passed as a result of this
    // i think bc its async it's getting to the render method before the state changes
  }

  getAlbums(artist) {
    const url = `http://localhost:3273/albums/${artist}`;
    // calling a get request to pull down all the albums in the db that matches the artist
    // this only pulls down the albums that the artist is the primary artist for, not appears on
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('albums data', data);
        this.setState({
          albums: data,
        });
        // console.log('albums state', this.state.albums);
      })
      .catch((err) => {
        // console.error(err);
      });
    // need to write tests for this
    // console.log('albums state', this.state.albums);
  }

  getFeatures(artist) {
    const url = `http://localhost:3273/albums/features/${artist}`;
    // calling a get request to pull down all the albums in the db that matches the artist
    // this only pulls down the albums that the artist appears on
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('features data', data);
        this.setState({
          features: data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // need to write tests for this
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <AlbumList type="Albums" albums={this.state.albums} />
          <AlbumList type="Singles and EPs" albums={this.state.albums} />
          {/* fix the single or EP type thing to take either of the types */}
          <AlbumList type="Compilations" albums={this.state.albums} />
          <AlbumList type="Appears On" albums={this.state.features} />
        </div>
      );
    }
    return (
      <div />
    );

  }
}

ReactDom.render(<App />, document.getElementById('app'));
