const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');



const movieService = require("../services/MovieServices");


//Get all movies
//router.get("/",movieService.getMovieListing);
router.get("/",movieService.getMovieListing);
router.post("/",movieService.addAMovie);
router.put('/:id', movieService.updateAProduct);
router.delete('/:id',movieService.deleteAProduct);



module.exports=router;