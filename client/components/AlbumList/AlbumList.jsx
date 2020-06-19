import React from 'react';
import Album from '../Album/Album.jsx';

class AlbumList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      albums: [],
      showMore: false,
    };
  }

  componentDidMount() {
    let albumsOfType = [];
    if (this.state.type === 'Appears On') {
      albumsOfType = this.props.albums;
    } else if (this.state.type === 'Albums') {
      for (var album of this.props.albums) {
        if (album.type === 'album') {
          albumsOfType.push(album);
        }
      }
    } else if (this.state.type === 'Singles and EPs') {
      for (var album of this.props.albums) {
        if (album.type === 'single' || album.type === 'EP') {
          albumsOfType.push(album);
        }
      }
    } else {
      for (var album of this.props.albums) {
        if (album.type === 'collaboration') {
          albumsOfType.push(album);
        }
      }
    }
    this.setSate({
      albums: albumsOfType,
    });
    // should set the state to hold the albums of the artist of the correct type
  }
  // console.log('hello world');
  // return <Album />;

  render() {
    return(
      <div className="albumList">
        <div className="album-list-title">{this.state.type}</div>
        <div className="album-list-list">
          {this.state.albums.map((album) => <Album album={album} key={album._id} />)}
        </div>
        <div className="album-list-show-more-less">show more</div>
      </div>
    );
  };
};

export default AlbumList;
