import React from 'react';
import {GrCirclePlay} from 'react-icons/gr';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      buttonUrls: ['https://tinyurl.com/ycfrzsl7', 'https://tinyurl.com/ycy9f3vp'],
      // these are mock pictures, get better ones when I can
      // buttonUrls: ['https://fakespotify.s3-us-west-1.amazonaws.com/play-button-transparent.png','https://fakespotify.s3-us-west-1.amazonaws.com/pause-button-transparent.png'],
      buttonIndex: 0,
      // showButton: false,
    };
    this.play = this.play.bind(this);
    // this.show = this.show.bind(this);
  }
  // props should be an album object with properties for the title, cover image, first song and key and onclick and onhover handlers that play the song
  // adding this comment to test circle

  play(event) {
    const playButton = document.getElementById('play-button');
    if (this.state.playing === false) {
      // get the first song from the album and play the mp3
      // playButton.style.display = 'block';
      // currently messing with all the albums not just the one I am on
      // trying to set the display on click so that when I click to play it always displays the pause button but when I pause it it only displays on hover
      this.setState({
        playing: true,
        buttonIndex: 1,
        // showButton: true,
      });
    } else {
      // playButton.style.display = 'none';
      // stop playing the mp3 file currently playing
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
      <div className="album" id={this.props.key}>
        {/* <script src="./Album.css" /> */}
        {/* <h3 id="gr-play"> */}
        <div id="album-cover-wrapper">
          <img id="album-cover" src={this.props.album.imageUrl} alt="" />
          <img id="play-button" src={this.state.buttonUrls[this.state.buttonIndex]} alt="" onClick={this.play} />
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
