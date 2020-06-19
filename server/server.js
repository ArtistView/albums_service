const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const PORT = 3273;
const app = express();

app.use(express.static('public'));
// add in express static for the public folder
app.use(bodyParser());
app.use(cors());
// need to instantiate the database and then promisify
const db = require('../database/db.js');
const artists = require('../../top_songs_service/Songs.js');

Promise.promisifyAll(require('mongoose'));
// console.log(artists[0], artists[1]);
// for (var artist of artists) {
//   var artist1 = new db.Song(artist);
//   artist1.save(() => {
//   console.log('cool');
//   });
// }
// app.get('/songs', (req, res) => {
//   db.Song.find()
//     .then((data) => {
//       for (var item of data) {
//         console.log(item.albumId);
//         db.Album.updateOne({ _id: item.albumId },{$push: {songs: item._id}},{},(album)=>{
//           console.log('album found', album)
//         });
//         // .then((album)=> {
//         //   console.log(album[0], item._id, album[0].songs);
//         //   album[0].songs.push(item._id);
//         // })
//         // .catch((err)=>{
//         //   res.send(err);
//         // }); // { $push: {songs: item._id} });
//       }
//       res.send('done');
//     });
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
