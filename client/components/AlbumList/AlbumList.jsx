import React from 'react';
import Album from '../Album/Album.jsx';

class AlbumList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      albums: [],
      showMore: false,
      showMoreText: '',
      showAtAll: false,
    };
  }

  componentDidMount() {
    // console.log('prop albums', this.props);
    // console.log(this.props.albums);
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
        if (album.type === 'compilation') {
          albumsOfType.push(album);
        }
      }
    }
    if (albumsOfType.length > 0) {
      this.setState({
        albums: albumsOfType,
        showAtAll: true,
      });
    }
    if (albumsOfType.length > 12) {
      this.setState({
        showMoreText: 'show more',
      });
    }
    // console.log('albums', this.state.albums);
    // should set the state to hold the albums of the artist of the correct type
  }
  // need to write tests as well as write clickHandlers to be used as props for the album component

  render() {
    if (this.state.showAtAll) {
      return(
        <div className="album-list">
          <div className="album-list-title">{this.state.type}</div>
          <div className="album-list-list">
            {this.state.albums.map((album) => <Album album={album} key={album._id} />)}
          </div>
        <div className="album-list-show-more-less">{this.state.showMoreText}</div>
        </div>
      );
    }
    return <div id="no-albums-of-this-type" />;
  };
};

export default AlbumList;
