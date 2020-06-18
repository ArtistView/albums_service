import React from 'react';

const Album = (props) => {
  // props should be an album object with properties for the title, cover image, first song and key and onclick and onhover handlers that play the song
  console.log(props);
  // adding comment here so something is changed and I can test circleCI
  return (
    <div className="album" id={props.album.key}>
      Hello World
      <image src={props.album.imageUrl}> </image>
      {/* need a hovering play button that goes over the image and appears on hover onClick for the play button should call ()=>{props.onClick(props.album.firstSong)} */}
      <div className="albumtitle">
        {props.album.title}
      </div>
    </div>
  );
};

export default Album;
