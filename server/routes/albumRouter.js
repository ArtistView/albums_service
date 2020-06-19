const express = require('express');
const Promise = require('bluebird');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express.Router();
// console.log('before use');
router.use(bodyParser());
router.use(cors());
const db = require('../../database/db.js');
Promise.promisifyAll(require('mongoose'));
// console.log('hello');
router.get('/:artistId', (req, res) => {
  console.log('running request', req.params);
  db.Album.find({ artistId: req.params.artistId })
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      res.error(err);
    });
});
