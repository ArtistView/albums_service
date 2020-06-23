import React from 'react';
import {GrCirclePlay} from 'react-icons/gr';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      playing: false,
      buttonUrls: ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-2.png', 'https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-try-3.png'],
      // these pics aren't perfect so maybe find better ones later
      buttonIndex: 0,
      currentlyPlayingSong: {},
      nextSong: this.props.album.songs[0],
      nextSongIndex: 0,
      // currAlbumPlaying: this.props.currPlaying,
      // showButton: false,
    };
    this.play = this.play.bind(this);
    this.getSong = this.getSong.bind(this);
  }
  // props should be an album object with properties for the title, cover image, first song and key and onclick and onhover handlers that play the song

  componentDidMount() {
    this.getSong(this.state.nextSong);
  }

  componentDidUpdate() {
    // makes sure that when another album is clicked, the current album stops playing,
    if(this.props.currPlaying !== this.props.album._id && this.props.currPlaying !== '' && this.state.playing === true) {
      this.refs.playbutton.style.display = ''; // makes the play button return to normal hover behavior as we set in css
      this.setState({
        playing: false,
        buttonIndex: 0,
        currentlyPlayingSong: {},
        nextSong: this.props.album.songs[0],
        nextSongIndex: 0,
      });
      this.getSong(this.state.nextSong); // should reset the song to the first song in the album
      // need to test this stuff
      // implement pause functionality within here too
      console.log(this.state);
      return;
    }
  }

  getSong(songId) {
    const url = `http://localhost:3273/songs/${songId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('albums data', data);
        if (this.state.nextSongIndex >= this.props.albums.songs.length) {
          this.setState({
            currentlyPlayingSong: data,
            nextSong: '',
          });
        } else {
          this.setState({
            currentlyPlayingSong: data,
            nextSong: this.props.album.songs[this.state.nextSongIndex + 1],
            nextSongIndex: this.state.nextSongIndex + 1,
          });
        }
        // console.log('albums state', this.state.albums);
      })
      .catch((err) => {
        // console.error(err);
      });
  }

  play(event) {
    // console.dir(event.target);
    // console.log(this.state);
    console.log(this.props);
    if (this.state.playing === false) {
      // get the first song from the album and play the mp3
      event.target.style.display = 'block'; // makes the pause button persist even after hover
      this.props.startPlaying(this.props.album._id);
      // turn this off if another album is clicked
      // the album cover should stay darker when the pause is showing too
      this.setState({
        playing: true,
        buttonIndex: 1,
        // showButton: true,
      });
    } else {
      // stop playing the mp3 file currently playing
      event.target.style.display = ''; // makes the play button return to normal hover behavior as we set in css
      this.setState({
        playing: false,
        buttonIndex: 0,
      });
    }
  }

  // show(event) {
  //   if (playing === true){
  //     return true;
  //   }
  // }

  render() {
    return (
      <div ref={this.myRef} className="album" id={this.props.key}>
        {/* <script src="./Album.css" /> */}
        {/* <h3 id="gr-play"> */}
        <div id="album-cover-wrapper">
          <img id="album-cover" src={this.props.album.imageUrl} alt="" />
          <img ref="playbutton" id="play-button" src={this.state.buttonUrls[this.state.buttonIndex]} alt="" onClick={this.play} />
        </div>
        {/* I made a play and pause button on my computer saved in my desktop, need to figure out how to have them render on top of the album cover and switch when one is clicked (prob with state) */}
        {/* need a hovering play button that goes over the image and appears on hover onClick for the play button should call ()=>{props.onClick(props.album.firstSong)} */ }
        <div id="album-title">
          {this.props.album.title}
        </div>
      </div>
    );
  }
};

export default Album;
