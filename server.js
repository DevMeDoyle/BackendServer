const express = require("express");
const mongoose = require('mongoose');
const expressfileUpload = require("express-fileupload");
require('dotenv').config({path: `config/keys.env`})
const {db} = require ('./db/movies-seed.js')


const cors = require ('cors');


const app = express("");

const moviesController = require ("./controllers/MoviesController.js");
const userController = require ("./controllers/UserControler.js");
//const authController = require ("./controllers/AuthController.js")


app.use(express.json());
app.use(expressfileUpload());


app.use(cors({
    origin:"http://localhost:3000"    

}))

//app.use("/auth",authController);
app.use("/movies",moviesController);
app.use("/user",userController);




        
    
// const PORT = 5000;
app.listen(process.env.PORT,()=>{


    console.log(`Web Server is up and running on PORT ${process.env.PORT}`);

   // Mongoose.connect('mongodb://localhost:27017/test');



    mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(()=>{
// 
    //    db();

        console.log(`API is connected to MongoDB database`)
    })
    .catch(err=>console.log(`Error ${err}`));

})