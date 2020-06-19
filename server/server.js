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
  console.log('running request', req.params);
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
app.get('/albums/byId/:albumId', (req, res) => {
  db.Album.findOne({ _id: req.params.albumId })
    .then((albums) => {
      // console.log('in the then', albums);
      res.send(albums);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});
// code below was used for populating database, prob not needed but I'll leave it for now
// console.log(artists[0], artists[1]);
// for (var artist of artists) {
//   var artist1 = new db.Song(artist);
//   artist1.save(() => {
//   console.log('cool');
//   });
// }
// var types = ['album', 'single', 'EP', 'compilation'];
// app.get('/songs', (req, res) => {
//   db.Song.find()
//     .then((data) => {
//       res.send(data);
//     });
//   // .then((album)=> {
//   //   console.log(album[0], item._id, album[0].songs);
//   //   album[0].songs.push(item._id);
//   // })
//   // .catch((err)=>{
//   //   res.send(err);
//   // }); // { $push: {songs: item._id} });
// });
// const artist1 = new db.Album({
//   name: 'Squarepants',
//   artistId: '5eebdbf1bf2d490c13ff868d',
//   type: 'album',
//   imageUrl: 'https://tinyurl.com/ya65klnb',
// });
// artist1.save(() => {
//   console.log('cool');
// });
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
