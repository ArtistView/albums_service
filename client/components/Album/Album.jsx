import React from 'react';

const Album = (props) => {
  // props should be an album object with properties for the title, cover image, first song and key and onclick and onhover handlers that play the song
  console.log(props);
  // adding this comment to test circle
  return (
    <div className="album" id={props.key}>
      {/* <script src="./Album.css" /> */}
      <img id="album-cover" src={props.album.imageUrl} alt="" />
      {/* need a hovering play button that goes over the image and appears on hover onClick for the play button should call ()=>{props.onClick(props.album.firstSong)} */}
      <div className="albumtitle">
        {props.album.title}
      </div>
    </div>
  );
};

export default Album;
