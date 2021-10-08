
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');



const userService = require("../services/UserServices");


//Get all movies
router.get("/",userService.getUserListing);
router.post("/",userService.addAUser);



module.exports=router;