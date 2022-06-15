const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "2323";

const trakt = "https://api.trakt.tv";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  getTrendingMovies(res);
});

app.get("/popular-shows", (req, res) => {
  getPopularShows(res);
});

//HTTP server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


/**
 * Function to make a request to retrieve trending movies
 * then render on the page.
 *
 * @param {Response} res The Response for the page to be used for rendering.
 */
function getTrendingMovies(res) {
  axios(
    //config options
    {
      url: `${trakt}/movies/trending`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
    ).then(function (response) {

      res.render("index", { title: "Home", movies: response.data });
    }).catch(function (error) {
      //Put error in console.
      console.log(error);
  });
}

/**
 * Function to make a request to retrieve popular shows
 * then render on the page.
 *
 * @param {Response} res The Response for the page to be used for rendering.
 */
function getPopularShows(res) {
  axios(
    //config options
    {
      url: `${trakt}/shows/popular?limit=15`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID,
      }
    }
    ).then(function (response) {

      res.render("shows", { title: "Popular Shows", shows: response.data });
    }).catch(function (error) {
      //Put error in console.
      console.log(error);
  });
}
