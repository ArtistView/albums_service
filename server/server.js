const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const PORT = 3273;
const app = express();
// const albums = require('./routes/albumRouter');
// router is breaking rn so I'm just writing the route in here directly
// console.log('albums', albums);

app.use(express.static('public'));
// add in express static for the public folder
app.use(bodyParser());
app.use(cors());
// need to instantiate the database and then promisify
const db = require('../database/db.js');
// const artists = require('../../top_songs_service/Songs.js');

Promise.promisifyAll(require('mongoose'));

// app.use('/albums', albums);

app.get('/albums/:artistId', (req, res) => {
  // console.log('running request', req.params);
  // try to refactor this to get into router later but for now it works
  // also add tests
  db.Album.find({ artistId: req.params.artistId })
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get('/albums/features/:artistId', (req, res) => {
  // console.log('running request', req.params);
  // try to refactor this to get into router later but for now it works
  // also add tests
  db.Album.find({ featuredArtists: req.params.artistId })
    .then((albums) => {
      // console.log('in the then', albums);
      res.send(albums);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});

app.get('/songs/byAlbum/:albumId', (req, res) => {
  db.Album.findOne({ _id: req.params.albumId }) // finds the album by id
    .then((album) => {
      let songList = album.songs; // creates a clone of the songs list to modify
      Promise.all(songList.map((song) => { // find the songs by id and modifies songList to contain their mp3s
        return (db.Song.findOne({ _id: song }) // finds the song in the database
          .then((songFound) => {
            return songFound.mp3; // returns the mp3 of the song found
          })
          .catch((err) => res.send(err)));

      }))
        .then((songListUpdated) => {
          res.send(songListUpdated); // sends the updated song list back to the client
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

module.exports = app;
