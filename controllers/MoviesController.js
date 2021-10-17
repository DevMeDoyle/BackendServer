const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');



const movieService = require("../services/MovieServices");


//Get all movies
//router.get("/",movieService.getMovieListing);
router.get("/",movieService.getMovieListing);
router.post("/",movieService.addAMovie);



module.exports=router;