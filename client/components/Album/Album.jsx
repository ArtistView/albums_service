import React from 'react';
import {GrCirclePlay} from 'react-icons/gr';

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
      currentlyPlayingSong: {}, // stores the song object that is currently playing
      nextSong: this.props.album.songs[0], // stores the id of the next song to be played, initialized to the first song in the album since that will play first upon click of the play button
      nextSongIndex: 0, // stores the index of the next song to be played within the songs array of the album
      audio: '', // stores the mp3 file for the song that is playing
    };
    this.play = this.play.bind(this);
    this.getSong = this.getSong.bind(this);
  }

  componentDidMount() {
    this.getSong(this.state.nextSong);
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
      });
      this.getSong(this.props.album.songs[0]); // should reset the song to the first song in the album
      this.state.audio.currentTime = 0; // resets the song to the beginning
      // need to test this stuff
      // implement pause functionality within here too
      // return;
    }
  }

  getSong(songId) {
    // gets the song object from the database by id
    // corresponding route within the server.js actually makes the db query
    const url = `http://localhost:3273/songs/${songId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('song is', data);
        if (this.state.nextSongIndex >= this.props.album.songs.length) {
          // if this is the last song in the album, set the next song to be nothing
          this.setState({
            currentlyPlayingSong: data,
            nextSong: '',
          });
        } else {
          // otherwise set the current song to the object and increment the next song by 1 in the album's songs array
          this.setState({
            currentlyPlayingSong: data,
            nextSong: this.props.album.songs[this.state.nextSongIndex + 1],
            nextSongIndex: this.state.nextSongIndex + 1,
            audio: new Audio(data.mp3),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  play(event) {
    // on click of the play button, we toggle the play and pause images and implement functionality and styling
    // need to actually implement the play/pause music functionality by grabbing the mp3 from currently playing and playing it
    if (this.state.playing === false) {
      // TO DO: get the first song from the album and play the mp3
      event.target.style.display = 'block'; // makes the pause button persist even after hover
      this.props.startPlaying(this.props.album._id); // changes the global state to be playing this album
      // this will trigger any other album that is playing to stop through the componentDidUpdate method
      this.refs.albumcover.style.opacity = 0.5; // the album cover will stay darker when the pause is showing as if it was being hovered over
      // console.log('this shopuld play', this.state.currentlyPlayingSong);
      // let audio = new Audio(this.state.currentlyPlayingSong.mp3);
      this.state.audio.play(); // plays the audio from the mp3 file for the current song
      // at the end of the song we need to call getSong again for the next song's mp3 to start
      this.setState({
        playing: true,
        buttonIndex: 1,
      });
    } else {
      // TO DO: stop playing the mp3 file currently playing
      event.target.style.display = '';
      this.refs.albumcover.style.opacity = '';
      // the above two lines make the play button return to normal hover behavior as we set in css
      this.state.audio.pause();
      this.setState({
        playing: false,
        buttonIndex: 0,
      });
    }
  }

  render() {
    // renders an album cover with a play button on top of it that has clickable functionality
    // also renders an album title underneath that underlines on hover but doesn't have clickable functionality as that is outside the scope of the artist page, theoretically in actual spotify a click will take you to the album's page though
    return (
      <div ref={this.myRef} className="album" id={this.props.key}>
        {/* <script src="./Album.css" /> */}
        {/* <h3 id="gr-play"> */}
        <div id="album-cover-wrapper">
          <img ref="albumcover" id="album-cover" src={this.props.album.imageUrl} alt="" />
          <img ref="playbutton" id="play-button" src={this.state.buttonUrls[this.state.buttonIndex]} alt="" onClick={this.play} />
        </div>
        <div id="album-title">
          {this.props.album.title}
        </div>
      </div>
    );
  }
}

export default Album;
