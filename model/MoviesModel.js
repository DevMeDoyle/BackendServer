// created Mongoodr Schema / create model / Export



const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({

    title: {
        type:String,
        required: true
    },

    description: {
        type:String,
        required: false
    },

    genre: {
        type: String,
       
    },

    ratings: {
        type: String,
        required: true
    },

    releasedate: {
        type: Date,
        required: true
    },

    priceToRent: {
        type: Number,
        required: true
    },

    priceToBuy: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        default: "default.jpg"
    },

    poster: {
        type: String,
        default: "default.jpg"
    },


    featured: 
    {
        type: Boolean,
        default: false
    },

    type:
    {
        type: String,
        required: true
    },

    dateCreated:{
        type:Date,
        default:Date.now()
    }

    

});

const movieModel = mongoose.model("movies",movieSchema);

module.exports = movieModel;