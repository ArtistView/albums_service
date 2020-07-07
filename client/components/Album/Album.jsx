import React from 'react';
import $ from 'jquery';
import styled, { css } from 'styled-components';
import {GrCirclePlay} from 'react-icons/gr';

const AlbumCover = styled.img`
  width:173.25px;
  height:173.25px;
  object-fit: cover;
`;

const PlayButton = styled.img`
  display: none;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  width:70px;
  height:70px;
  &:hover {
    width:73px;
    height:73px;
  };
`; // change percentages and size as needed and make sure it's centered

const AlbumTitle = styled.div`
  font-size: small;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  };
  display: inline-block;
`;

const AlbumCoverWrapper = styled.div`
  position: relative;
  width:173.25px;
  height:173.25px;
`;

// resize to fit the 232 offset margin
const AlbumWrapper = styled.div`
  position: relative;
  text-align: center;
  float: left;
  margin-left: 11px;
  margin-right: 11px;
  margin-bottom: 50px;
  width: 173.25px;
  &:hover ${AlbumCover} {
    opacity: .5;
  };
  &:hover ${PlayButton} {
    display: block;
  };
`;

class Album extends React.Component {
  // takes in an album object as a prop as well as a startPlaying function, which modifies the app state for which album is playing and a currPlaying property which stores the app state for which album is playing
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      playing: false, // tracking if the album is currently playing
      buttonUrls: ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'], // array of the play and puase button images from my S3
      // buttonUrls: ['https://www.pngfind.com/pngs/m/427-4277341_add-play-button-to-image-online-overlay-play.png', 'https://tinyurl.com/ybdhlhsl'], // array of play and pause button images not through S3, doesn't look like spotify but it won't charge me, uncomment this and comment the line above for SDC bc those images won't be available
      // functionality remains intact
      // list of links to my play and pause icons
      buttonIndex: 0, // which icon (play (0) or pause(1)) is currently showing, used to access the links from buttonUrls array
      currSongIndex: 0, // stores the index of the current song to be played within the songs array of the album
      audio: new Audio(''), // stores the mp3 file for the song that is playing
      audioList: [], // stores a list of all xthe mp3 files as audios for songs in the album
    };
    this.play = this.play.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.playNext = this.playNext.bind(this);
    this.updateSizing = this.updateSizing.bind(this);
  }

  componentDidMount() {
    this.getSongs(this.props.album._id);
    // upon loading the component it gets the list of mp3 and sets them in state
    window.addEventListener('resize', this.updateSizing);
    // fills the albums to the window as the size changes
  }

  componentDidUpdate() {
    // this will run whenever a prop is changed (which will happen whenever the currPlaying changes to another album by play being clicked in that component)
    // makes sure that when another album is clicked, the current album stops playing and resets its behavior to what it is initially
    if(this.props.currPlaying !== this.props.album._id && this.props.currPlaying !== '' && this.state.playing === true) {
      this.refs.playbutton.style.display = ''; // makes the play button return to normal hover behavior as we set in css
      this.refs.albumcover.style.opacity = '';
      // reset the song state to the first song in the album
      this.state.audio.pause(); // pauses the audio upon another album's click
      this.setState({
        playing: false,
        buttonIndex: 0,
        audio: new Audio(this.state.audioList[0]),
      });
      this.state.audio.currentTime = 0; // resets the song to the beginning
      this.state.audio.addEventListener('ended', () => {
        this.playNext();
      });
      // need to test this stuff
    }
    if(this.props.currPlaying === this.props.album._id && this.props.show === true && this.state.playing === true) { // if this is playing but was collapsed through the show less button
      this.refs.albumcover.style.opacity = 0.5;
      this.refs.playbutton.style.display = 'block';
      // this changes it to showing but it keeps these style settings permanently, won't change it back to the defaults when I press pause
    }
    if(this.props.show === true) {
      this.updateSizing(); // changes the sizing to match the screen size
    }
  }

  getSongs(album) {
    const url = `http://localhost:3273/songs/byAlbum/${album}`;
    fetch(url) // fetches the list of mp3s for the given album
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          audioList: data,
        });
      })
      .then(() => {
        this.setState({
          audio: new Audio(this.state.audioList[this.state.currSongIndex]),
        });
        this.state.audio.addEventListener('ended', () => {
          this.playNext(); // add event listener to the audio that plays the next song once it ends
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  play(event) {
    // on click of the play button, we toggle the play and pause images and implement functionality and styling
    // also plays/pauses audio on click
    if (this.state.playing === false) {
      event.target.style.display = 'block'; // makes the pause button persist even after hover
      this.props.startPlaying(this.props.album._id); // changes the global state to be playing this album
      // this will trigger any other album that is playing to stop through the componentDidUpdate method
      this.refs.albumcover.style.opacity = 0.5; // the album cover will stay darker when the pause is showing as if it was being hovered over
      this.state.audio.play(); // plays the audio from the mp3 file for the current song
      this.setState({
        playing: true,
        buttonIndex: 1,
      });
    } else {
      event.target.style.display = '';
      this.refs.albumcover.style.opacity = '';
      // the above two lines make the play button return to normal hover behavior as we set in css
      this.state.audio.pause(); // pauses the current mp3 file upon clicking the pause button
      this.setState({
        playing: false,
        buttonIndex: 0,
      });
    }
  }

  playNext() {
    // this method will go to the next song in the album list and play it
    this.setState({ // increments the current song before checking if the album has ended
      currSongIndex: this.state.currSongIndex + 1,
    });
    if (this.state.currSongIndex >= this.state.audioList.length) {
      // if there are no more songs left in the album, reset the current song to the beginning of the album but don't play it
      this.setState({
        playing: false,
        buttonIndex: 0,
        audio: new Audio(this.state.audioList[0]),
        currSongIndex: 0,
      });
      this.refs.playbutton.style.display = '';
      this.refs.albumcover.style.opacity = '';
      this.state.audio.addEventListener('ended', () => {
        this.playNext();
      });
      // makes the play button return to normal hover behavior as we set in css
    } else {
      // if there are more songs in the list play the next song (which was incremented before the else)
      this.setState({
        audio: new Audio(this.state.audioList[this.state.currSongIndex]),
      });
      this.state.audio.play();
      this.state.audio.addEventListener('ended', () => {
        this.playNext();
      });
    }
  }

  updateSizing() {
    // set number to be the number of elements shown in the first two rows
    let percentPerAlbum = 0;
    const width = $(window).width();
    if (width > 1040 && width < 1200) {
      percentPerAlbum = 21;
    } else if (width < 1040 && width > 850) {
      percentPerAlbum = 28;
    } else if (width < 850) {
      percentPerAlbum = 43;
    } else {
      this.refs.albumwrapper.style.width = '';
      this.refs.albumcoverwrapper.style.height = '';
      this.refs.albumcoverwrapper.style.width = '';
      this.refs.albumcover.style.height = '';
      this.refs.albumcover.style.width = '';
      return;
    }
    let size = (width - 232) * (percentPerAlbum / 100);
    this.refs.albumwrapper.style.width = size;
    this.refs.albumcoverwrapper.style.height = size;
    this.refs.albumcoverwrapper.style.width = size;
    this.refs.albumcover.style.height = size;
    this.refs.albumcover.style.width = size;
  }

  render() {
    // renders an album cover with a play button on top of it that has clickable functionality
    // also renders an album title underneath that underlines on hover but doesn't have clickable functionality as that is outside the scope of the artist page, theoretically in actual spotify a click will take you to the album's page though
    if (this.props.show) { // if it should be showing
      return (
        <AlbumWrapper ref="albumwrapper" className="album" id={this.props.id}>
          <AlbumCoverWrapper ref="albumcoverwrapper" id="album-cover-wrapper">
            <AlbumCover ref="albumcover" id="album-cover" src={this.props.album.imageUrl} alt="" />
            <PlayButton ref="playbutton" id="play-button" src={this.state.buttonUrls[this.state.buttonIndex]} alt="" onClick={this.play} />
          </AlbumCoverWrapper>
          <AlbumTitle id="album-title">
            {this.props.album.title}
          </AlbumTitle>
        </AlbumWrapper>
      );
    }
    return (<div />);
  }
}

export default Album;
