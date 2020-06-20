import React from 'react';
import {GrCirclePlay} from 'react-icons/gr';

const Album = (props) => {
  // props should be an album object with properties for the title, cover image, first song and key and onclick and onhover handlers that play the song
  // adding this comment to test circle
  return (
    <div className="album" id={props.key}>
      {/* <script src="./Album.css" /> */}
      {/* <h3 id="gr-play"> */}
      <img id="album-cover" src={props.album.imageUrl} alt="" />
      {/* <img id="play-button" src="https://ibb.co/hWs6JY8" alt="" /> */}
      {/* I made a play and pause button on my computer saved in my desktop, need to figure out how to have them render on top of the album cover and switch when one is clicked (prob with state) */}
      {/* need a hovering play button that goes over the image and appears on hover onClick for the play button should call ()=>{props.onClick(props.album.firstSong)} */ }
      <div id="album-title">
        {props.album.title}
      </div>
    </div>
  );
};

export default Album;
