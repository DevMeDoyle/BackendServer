const express = require("express");
const mongoose = require('mongoose');




const moviesController = require ("./controllers/MoviesController.js");
const userController = require ("./controllers/UserControler.js");
//const authController = require ("./controllers/AuthController.js")
const app = express();
app.use(express.json())

app.use("/user",userController);
//app.use("/auth",authController);
app.use("/movies",moviesController);


        
    
const PORT = 5000;
app.listen(PORT,()=>{


    console.log(`Web Server is up and running on PORT ${PORT}`);

   // Mongoose.connect('mongodb://localhost:27017/test');

    mongoose.connect(`mongodb+srv://admin:rugbydb@cluster0.t4n1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(()=>{

        console.log(`API is connected to MongoDB database`)
    })
    .catch(err=>console.log(`Error ${err}`));

})