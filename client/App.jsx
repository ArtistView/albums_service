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
    };
    this.getAlbums = this.getAlbums.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
  }

  componentDidMount() {
    this.getAlbums(this.state.artist);
    this.getFeatures(this.state.artist);
  }

  getAlbums(artist) {
    const url = `http://localhost:3273/albums/:${artist}`;
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
    // need to write tests for this
  }

  getFeatures(artist) {
    const url = `http://localhost:3273/albums/featured/:${artist}`;
    // calling a get request to pull down all the albums in the db that matches the artist
    // this only pulls down the albums that the artist appears on
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          features: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // need to write tests for this
  }

  render() {
    return (
      <div>
        <AlbumList type="album" albums={this.state.albums} />
        <AlbumList type="single or EP" albums={this.state.albums} />
        {/* fix the single or EP type thing to take either of the types */}
        <AlbumList type="collection" albums={this.state.albums} />
        <AlbumList type="appears on" albums={this.state.features} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
