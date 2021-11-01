//

const movieModel = require("../model/MoviesModel.js")
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');




//Add A movie
exports.addAMovie = (req,res)=>{

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey
    });

    const newMovie = new movieModel(
        // title : data.title,
        // description: data.description,
        // genre: data.genre,
        // ratings: data.ratings,
        // releasedate: data.releasedate,
        // priceToRent: data.priceToRent,
        // priceToBuy: data.priceToBuy,
        // type: data.type

        req.body
    );

    console.log(req.files)
    // newMovie.files=req.files
    newMovie.save()
    .then( movieadd => {

     const randomID = uuidv4();
        // Setting up S3 upload parameters

        console.log(randomID)

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${randomID}_${req.files.image.name}`,  // File name you want to save as in S3
        Body: req.files.image.data
    };

    // Uploading files to the bucket
         s3.upload(params, function(err, data) {
        if (err) {
            throw err;

        }

        movieadd.image = data.Location
        newMovie.save()
        .then(newMovie=>{
            res.json({

                message: `The movie was successfully created`,
                data: newMovie
    
    
            })


        })


        

        console.log(`File uploaded successfully S3BUcket:. ${data.Location}`)

    });

      
       
    })
    .catch(err=>{
        res.status(500).json({

            message: `Error ${err}`,
        })

    })
   
};

//Get All Movies

exports.getMovieListing =(req,res,next)=>{




    //domain.com/movies?genere=action

    //This returns all movies filtered by genre and featured
    if(req.query.genre && req.query.featured )
    {

        movieModel.find()
        .where("genre").equals(req.query.genre)
        .and([{featured : req.query.featured}, {type:"movies"}])
        .then((movieprd)=>{
    
            res.json({
    
                message: "A list of all the movies in the database",
                data : movieprd,
                total: movieprd.length
            })
        })
       .catch(err=>{
            res.status(500).json({
                message:`Error ${err}`
            })
        })
    }

//tv


else if(req.query.type && req.query.featured )
{

    movieModel.find()
    .where("type").equals(req.query.type)
    .and([{featured : req.query.featured}, {type:"tv-shows"}])
    .then((movieprd)=>{

        res.json({

            message: "A list of all the movies in the database",
            data : movieprd,
            total: movieprd.length
        })
    })
   .catch(err=>{
        res.status(500).json({
            message:`Error ${err}`
        })
    })
}



    //This returns all movies filtered by genre ONLY
    else if(req.query.genre)
    {
        movieModel.find()
        .where("type").equals(req.query.genre)
        .and([ {type:"tv-show"}])

        .then((movieprd)=>{
    
            console.log(movieprd)


            res.json({
    
                message: `A  list of ${req.query.type} movies`,
                data : movieprd,
                total: movieprd.length
            })
        })
       .catch(err=>{
            res.status(500).json({
                message:`Error ${err}`
            })
        })
    }

    //This returns all movies filtered by featured ONLY
    else if(req.query.featured)
    {

        movieModel.find()
        .where("featured").equals(req.query.featured)
        .and([ {type:"movies"}])
        .then((movieprd)=>{
    
            res.json({
    
                message:  req.query.featured ? "A list of featured movies" : "A list of non featured movies", 
                data : movieprd,
                total: movieprd.length
            })
        })
       .catch(err=>{
            res.status(500).json({
                message:`Error ${err}`
            })
        })
    }

    //This returns all movies 
    else
    {
        movieModel.find()
        .where("type").equals("movies")
        .then((movieprd)=>{
    
            res.json({
    
                message: "A list of all the movies in the database",
                data : movieprd,
                total: movieprd.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:`Error ${err}`
            })
        })
    
    }

    
    






};

//Update a Movie
exports.updateAProduct = (req,res)=>{


    const updatedDate = req.body;


    //validation


    movieModel.findByIdAndUpdate(req.params.id,updatedDate,{new:true})
    .then(product=>{

        //product not null. ID found
        if(product)
        {

            res.json({
                message : `Product with id (${req.params.id}) was updated successfully `,
                data : product
            })

        }
        //product was null because the id was not found
        else
        {
            res.stauts(404).json({
                message : `Product with ID : ${req.params.id} not found`,
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })


}


//Delete a Movie

exports.deleteAProduct = (req,res)=>{

    movieModel.findByIdAndRemove(req.params.id)
    .then(product=>{

        console.log(product)
        if(product)
        {
            res.json({
                message :`Product was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `Product with ID ${req.params.id} not found`
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })
}

