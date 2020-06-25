import React from 'react';
import styled, { css } from 'styled-components';
import {GrCirclePlay} from 'react-icons/gr';

const AlbumWrapper = styled.div`
  float: left;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 50px;
  width: 180;
`;

const AlbumCover = styled.img`
  width:180px;
  height:180px;
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
`; // change percentages and size as needed and make sure it's centered

const AlbumTitle = styled.div`
  text-align: center;
  font-size: small;
  margin-top: 10px;
`;

class Album extends React.Component {
  // takes in an album object as a prop as well as a startPlaying function, which modifies the app state for which album is playing and a currPlaying property which stores the app state for which album is playing
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      playing: false, // tracking if the album is currently playing
      buttonUrls: ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'],
      // list of links to my play and pause icons
      buttonIndex: 0, // which icon (play (0) or pause(1)) is currently showing, used to access the links from buttonUrls array
      currSongIndex: 0, // stores the index of the current song to be played within the songs array of the album
      audio: new Audio(''), // stores the mp3 file for the song that is playing
      audioList: [], // stores a list of all xthe mp3 files as audios for songs in the album
    };
    this.play = this.play.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.playNext = this.playNext.bind(this);
  }

  componentDidMount() {
    this.getSongs(this.props.album.songs);
    // console.log(this.state);
    // upon loading the component it sets the currently playing song in state to be the first song in the album
    // honestly idk if this is what we want to do though, might just want to wait til play is pressed to get the songs from the db
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
  }

  getSongs(songs) {
    // gets the song object from the database by id
    // corresponding route within the server.js actually makes the db query
    songs.forEach((song) => {
      const songId = song;
      // console.log(songId, song);
      const url = `http://localhost:3273/songs/${songId}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            audio: new Audio(this.state.audioList[this.state.currSongIndex]),
            audioList: this.state.audioList.concat(data.mp3),
          });
          this.state.audio.addEventListener('ended', () => {
            this.playNext(); // add event listener to the audio that plays the next song once it ends
          });
          // }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  play(event) {
    // on click of the play button, we toggle the play and pause images and implement functionality and styling
    // need to actually implement the play/pause music functionality by grabbing the mp3 from currently playing and playing it
    if (this.state.playing === false) {
      event.target.style.display = 'block'; // makes the pause button persist even after hover
      this.props.startPlaying(this.props.album._id); // changes the global state to be playing this album
      // this will trigger any other album that is playing to stop through the componentDidUpdate method
      this.refs.albumcover.style.opacity = 0.5; // the album cover will stay darker when the pause is showing as if it was being hovered over
      this.state.audio.play(); // plays the audio from the mp3 file for the current song
      // at the end of the song we need to set the currSongIndex to increment by 1 and set the audio file to the next one in the list
      // use ended event and then call getSong for the next song and play it.
      this.setState({
        playing: true,
        buttonIndex: 1,
      });
    } else {
      event.target.style.display = '';
      this.refs.albumcover.style.opacity = '';
      // the above two lines make the play button return to normal hover behavior as we set in css
      this.state.audio.pause(); // pauser the current mp3 file upon clicking the pause button
      this.setState({
        playing: false,
        buttonIndex: 0,
      });
    }
  }

  playNext() {
    // this method will go to the next song in the album list and play it
    console.log('invoking play next');
    if (this.state.currSongIndex > this.state.audioList.length) {
      console.log('end of the album');
      // if there are no more songs left in the album, reset the current song to the beginning of the album but don't play it
      this.setState({
        playing: false,
        buttonIndex: 0,
        audio: new Audio(this.state.audioList[0]),
      });
      this.state.audio.addEventListener('ended', () => {
        this.playNext();
      });
      this.refs.playbutton.style.display = '';
      this.refs.albumcover.style.opacity = '';
      // makes the play button return to normal hover behavior as we set in css
    } else {
      // if there are more songs in the list increment the current song by one and play the song
      this.setState({
        audio: new Audio(this.state.audioList[this.state.currSongIndex + 1]),
        currSongIndex: this.state.currSongIndex + 1,
      });
      this.state.audio.play();
      console.log('play next song', this.state);
    }
  }

  render() {
    // renders an album cover with a play button on top of it that has clickable functionality
    // also renders an album title underneath that underlines on hover but doesn't have clickable functionality as that is outside the scope of the artist page, theoretically in actual spotify a click will take you to the album's page though
    return (
      <AlbumWrapper ref={this.myRef} className="album" id={this.props.key}>
        <div id="album-cover-wrapper">
          <AlbumCover ref="albumcover" id="album-cover" src={this.props.album.imageUrl} alt="" />
          <PlayButton ref="playbutton" id="play-button" src={this.state.buttonUrls[this.state.buttonIndex]} alt="" onClick={this.play} />
        </div>
        <AlbumTitle id="album-title">
          {this.props.album.title}
        </AlbumTitle>
        {/* <audio ref="audioFile" src={this.state.audio} onEnded={this.playNext} /> */}
      </AlbumWrapper>
    );
  }
}

export default Album;
