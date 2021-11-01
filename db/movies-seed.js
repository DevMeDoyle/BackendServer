const axios = require('axios');

const movieModel = require("../model/MoviesModel.js")

exports.db=()=>{


    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=7dbdc577453d35d0614ab7df17128a43&language=en-US&page=3')

  .then(function (res) {

    for(let i = 0; i<res.data.results.length; i++){
      movieModel.create({


        title: res.data.results[i].original_name,
        description: res.data.results[i].overview,
        ratings: res.data.results[i].popularity,
        releasedate: res.data.results[i].first_air_date,
        priceToRent: 9,
        priceToBuy: 17,
        image: process.env.BASE_POSTER_IMAGE_DOMAIN+res.data.results[i].poster_path,
        type: "tv-shows",
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