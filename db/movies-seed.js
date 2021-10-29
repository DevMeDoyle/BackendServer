const axios = require('axios');

const movieModel = require("../model/MoviesModel.js")

exports.db=()=>{


    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US&page=1')

  .then(function (res) {

    for(let i = 0; i<res.data.results.length; i++){
      movieModel.create({

        title: res.data.results[i].original_title,
        description: res.data.results[i].overview,
        ratings: res.data.results[i].popularity,
        releasedate: res.data.results[i].release_date,
        priceToRent: 10,
        priceToBuy: 25,
        image: process.env.BASE_POSTER_IMAGE_DOMAIN+res.data.results[i].poster_path,
        type: "movies",
        poster: process.env.BASE_BACKDROP_IMAGE_DOMAIN+res.data.results[i].backdrop_path
      })
    }
    // handle success
    console.log(res);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


}