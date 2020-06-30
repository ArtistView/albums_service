const supertest = require('supertest');
const app = require('../server/server.js');

const firstAlbum = {
  songs: [
    '5eebfe07a386ca12ede16e2c',
    '5eebfe07a386ca12ede16e90',
    '5eebfe07a386ca12ede16e2c',
    '5eebfe07a386ca12ede16e90',
    '5eebfe07a386ca12ede16e2c',
    '5eebfe07a386ca12ede16e90',
  ],
  featuredArtists: [],
  _id: '5eebdcc17b996d0c47797eb0',
  title: 'Squarepants',
  artistId: '5eebdbf1bf2d490c13ff868d',
  type: 'EP',
  imageUrl: 'https://tinyurl.com/ya65klnb',
  __v: 0,
};
const firstFeature = {
  songs: [
    '5eebfe07a386ca12ede16e2f',
    '5eebfe07a386ca12ede16e93',
    '5eebfe07a386ca12ede16e2f',
    '5eebfe07a386ca12ede16e93',
    '5eebfe07a386ca12ede16e2f',
    '5eebfe07a386ca12ede16e93',
  ],
  featuredArtists: [
    '5eebdbf1bf2d490c13ff868d',
  ],
  _id: '5eebecb1969c0a0fa4e0ce45',
  title: 'aliquam',
  imageUrl: 'https://tinyurl.com/yc9dd4jq',
  artistId: '5eebe7b2c451ef0e3f4c0533',
  __v: 0,
  type: 'album',
};
const songsList = [
  'https://fakespotify.s3-us-west-1.amazonaws.com/Intro+-+J.+Cole.mp3',
  'https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/BoxCat_Games_-_05_-_Battle_Boss.mp3',
  'https://fakespotify.s3-us-west-1.amazonaws.com/Intro+-+J.+Cole.mp3',
  'https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/BoxCat_Games_-_05_-_Battle_Boss.mp3',
  'https://fakespotify.s3-us-west-1.amazonaws.com/Intro+-+J.+Cole.mp3',
  'https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/BoxCat_Games_-_05_-_Battle_Boss.mp3',
];

const request = supertest(app);
const artistId = '5eebdbf1bf2d490c13ff868d';
describe('route tests', () => {
  it('gets the albums by artistId', async done => {
    // testing the get albums by id route
    const response = await request.get(`/albums/${artistId}`);
    expect(response.body.length).toBe(16);
    expect(response.body[0]).toStrictEqual(firstAlbum);
    expect(response.body[15].songs[0]).toBe('5eebfe07a386ca12ede16e2c');
    expect(response.body[15].type).toBe('album');
    expect(response.body[15].songs[2]).toBe(undefined);
    done();
  });
  it('gets the featured albums by artistId', async done => {
    // testing the get albums by id route
    const response = await request.get(`/albums/features/${artistId}`);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toStrictEqual(firstFeature);
    done();
  });
  it('gets the songs by albumId', async done => {
    // testing the get albums by id route
    const response = await request.get(`/songs/byAlbum/${firstAlbum._id}`);
    expect(response.body.length).toBe(6);
    expect(response.body).toStrictEqual(songsList);
    done();
  });
});
