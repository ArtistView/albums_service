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

app.listen(PORT, ()=>{
  console.log('listening on port', PORT);
})