import React from 'react';
import Album from '../Album/Album.jsx';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';

class AlbumList extends React.Component {
  // this component accepts a list of albums as props along with a playing function and currPlaying variable that are just needed to pass down to the album component, so it can modify the global state of which album is playing
  // if the type is Appears on, the albums prop is already all the featured albums, otherwise it is all albums that are primarily by that artist regardless of type (thus we will filter by type in componentDidMount)
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type, // stores the type of album this list is showing
      albums: [], // stores the list of albums that match the type
      showMore: false, // boolean telling us whether or not we should show more than 12 albums
      showMoreText: '', // stores the text to be rendered within the show more/less button
      showMoreArrow: '', // stores the icon to be rendered with the show more/less button
      showAtAll: false, // boolean telling us whether to show the component at all, should be false only if there are no albums of this particular type
      currShowing: [], // stores the list of albums to show, could be all the albums or just the first 12 depending on showMore
    };
    this.showMoreLess = this.showMoreLess.bind(this);
  }

  componentDidMount() {
    // upon loading we loop through all the albums from the artist and add only the ones that match our type to the array, which is then set to be albums in state
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
    // if there are any albums of this type, show them and set the list equal to albums
    if (albumsOfType.length > 0) {
      this.setState({
        albums: albumsOfType,
        showAtAll: true,
        currShowing: albumsOfType,
      });
    }
    // if there are more than 12, make sure the show more button appears and we start by only showing the first 12 albums
    if (albumsOfType.length > 12) {
      this.setState({
        showMoreText: 'SHOW MORE',
        currShowing: albumsOfType.slice(0,12),
        showMoreArrow: <AiOutlineDown id="album-down-arrow" />,
      });
    }
    // should set the state to hold the albums of the artist of the correct type
  }
  // need to write tests

  showMoreLess(event) {
    if (this.state.showMore === false) {
      // if it's currently showing twelve make it show all of the albums and change the text
      this.setState({
        showMore: true,
        showMoreText: 'SHOW LESS',
        currShowing: this.state.albums,
        showMoreArrow: <AiOutlineUp id="album-up-arrow" />,
      });
    } else {
      // if it's currently showing all the albums make it only show 12 and change the text
      this.setState({
        showMore: false,
        showMoreText: 'SHOW MORE',
        currShowing: this.state.albums.slice(0, 12),
        showMoreArrow: <AiOutlineDown id="album-down-arrow" />,
      });
    }
  }

  render() {
    // the albums list component renders a title, which is the type, a list of album components and a show more/less button with clickable functionality
    if (this.state.showAtAll) {
      return(
        <div className="album-list">
          <div className="album-list-title">{this.state.type}</div>
          <div className="album-list-list">
            {this.state.currShowing.map((album) => <Album album={album} key={album._id} startPlaying={this.props.playing} currPlaying={this.props.currPlaying} />)}
          </div>
          <div className="album-list-show-more-less" onClick={this.showMoreLess}>
            {this.state.showMoreText}
            {this.state.showMoreArrow}
          </div>
        </div>
      );
    }
    return <div id="no-albums-of-this-type" />;
  };
};

export default AlbumList;
