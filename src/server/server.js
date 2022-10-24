const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

let spotifyApi = new SpotifyWebApi({
  clientId: "50f9ac1c71114f1b880f52b6ee24697a",
  clientSecret: "5d04960a7e5b4436a1dad6bdb8615e24",
});

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

app.get(
  "/featuredPlaylists",
  (req, res) => {
    spotifyApi
      .getFeaturedPlaylists({
        offset: 1,
        country: "SE",
        locale: "sv_SE",
        timestamp: "2014-10-23T09:00:00",
      })
      .then(function (data) {
        res.status(200).json(data.body.playlists.items);
      });
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);

app.get("/recommendations", (req, res) => {
  spotifyApi
    .getRecommendations({
      limit: 100,
      min_energy: 0.9,
      seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
      min_popularity: 50,
    })
    .then(
      function (data) {
        res.status(200).json(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
});

app.get("/genres", (req, res) => {
  spotifyApi.getAvailableGenreSeeds().then(
    function (data) {
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

app.listen(3001);
