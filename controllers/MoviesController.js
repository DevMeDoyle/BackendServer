
const express = require('express')
const router = express.Router();


//const movieModel = require("../model/MoviesModel.js");

const movieService = require("../services/MovieServices.js")


//Get all movies
router.get("/",movieService.getAllMovieListing);

router.get("/:id",movieService.getSingleMovie);

router.get("/genre/:genre",movieService.getMovieGenre);

router.post("/",movieService.addAMovie);

// router.put("/:id",movieService.updateAMovie);

// router.delete("/:id",movieService.deleteAMovie);

module.exports=router;