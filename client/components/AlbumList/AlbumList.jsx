import React from 'react';
import $ from 'jquery';
import Album from '../Album/Album.jsx';
import styled, { css } from 'styled-components';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';

const AlbumListWrapper = styled.div`
  margin-left: 10px;
  background-color: #151515;
`;

const AlbumListTitle = styled.div`
  font-size: x-large;
  padding-top: 65px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const AlbumListShowMoreLess = styled.div`
  letter-spacing: 2px;
  clear: both;
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  font-weight: normal;
  position: relative;
`;

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
      numToShow: 12, // stores the number of albums that should be shown when show more is not pressed, should change when the window shrinks
      // TODO: update numToShow when the window shrinks and resize the albums to fit the window
    };
    this.showMoreLess = this.showMoreLess.bind(this);
    this.updateNumShowing = this.updateNumShowing.bind(this);
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
    if (albumsOfType.length > this.state.numToShow) {
      this.setState({
        showMoreText: 'SHOW MORE',
        currShowing: albumsOfType.slice(0, this.state.numToShow),
        showMoreArrow: <AiOutlineDown id="album-down-arrow" />,
      });
    }

    window.addEventListener('resize', this.updateNumShowing);
    // should set the state to hold the albums of the artist of the correct type
  }
  // need to write tests

  updateNumShowing() {
    // set number to be the number of elements shown in the first two rows
    let number = 12;
    let width = $(window).width();
    if (width > 1040 && width < 1150) {
      number = 8;
    } else if (width < 1040 && width > 850) {
      number = 3;
    } else if (width < 850) {
      number = 2;
    } else {
      number = 12;
    }
    if (this.showMore === false) {
      this.setState({
        numToShow: number,
        currShowing: this.state.albums.slice(0, number),
        // updates this but only updates what is actually showing when I press show more/less
        // also resize the album covers to fit as the window moves
      });
    } else {
      this.setState({
        numToShow: number,
        // updates this but only updates what is actually showing when I press show more/less
      });
    }
  }

  showMoreLess(event) {
    // TODO: need to make it so all albums exist no matter what but are only visible when showing more
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
        currShowing: this.state.albums.slice(0, this.state.numToShow),
        showMoreArrow: <AiOutlineDown id="album-down-arrow" />,
      });
    }
  }

  render() {
    // the albums list component renders a title, which is the type, a list of album components and a show more/less button with clickable functionality
    if (this.state.showAtAll) {
      return(
        <AlbumListWrapper className="album-list">
          <AlbumListTitle className="album-list-title">{this.state.type}</AlbumListTitle>
          <div className="album-list-list">
            {this.state.albums.map((album) => {
              // want to rerun this map function when currShowing changes
              let showing = false;
              if (this.state.currShowing.includes(album)) {
                showing = true;
              }
              return (<Album album={album} id={album._id} startPlaying={this.props.playing} currPlaying={this.props.currPlaying} show={showing} />);
            })
            }
          </div>
          <AlbumListShowMoreLess className="album-list-show-more-less" onClick={this.showMoreLess}>
            {this.state.showMoreText}
            {this.state.showMoreArrow}
          </AlbumListShowMoreLess>
        </AlbumListWrapper>
      );
    }
    return <div id="no-albums-of-this-type" />;
  };
};

export default AlbumList;
