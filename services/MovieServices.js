

const movieModel = require("../model/MoviesModel.js")

// exports.getMovieListing =(req,res,next)=>{

//     movieModel.find()
//     .then((movieprd)=>{

//         res.json({

//             message: "A list of all the movies in the database",
//             data : movieprd,
//             total: movieprd.length
//         })

 
//     })
//     .catch(err=>{

//         res.status(500).json({
//             message : `Error ${err}`,
//         })
//     })


// };

exports.addAMovie = (req,res)=>{

    const data = req.body;

    console.log(req.body);

    const newMovie = new movieModel(data);

    newMovie.save()
    .then((movieadd)=>{
        res.json({

            message: `The movie was successfully created`,
            data: movieadd
        })
       
    })
    .catch(err=>{
        res.status(500).json({

            message: `Error ${err}`,
        })

    })
   
};

//Find Specific

// exports.getMovieListing =(req,res,next)=>{

//     movieModel.find({genre : "Action"})
//     .then((movieprd)=>{

//         res.json({

//             message: "A list of all the movies in the database",
//             data : movieprd,
//             total: movieprd.length
//         })

 
//     })
//     .catch(err=>{

//         res.status(500).json({
//             message : `Error ${err}`,
//         })
//     })


// };

/*
Mongoose relational operator
eq
ne (not equal to)
gt (>)
lt (<)
gte (>=)
lte (<=)
*/



//Find movie greater or = 

// exports.getleListing =(req,res,next)=>{

//     movieModel.find({priceToBuy:{$gte : 60}})
//     .then((movieprd)=>{

//         res.json({

//             message: "A list of all the movies in the database",
//             data : movieprd,
//             total: movieprd.length
//         })

 
//     })
//     .catch(err=>{

//         res.status(500).json({
//             message : `Error ${err}`,
//         })
//     })


// };

/// not = to

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


    //This returns all movies filtered by genre ONLY
    else if(req.query.genre)
    {
        movieModel.find()
        .where("genre").equals(req.query.genre)
        .and([ {type:"movies"}])

        .then((movieprd)=>{
    
            console.log(movieprd)


            res.json({
    
                message: `A  list of ${req.query.genre} movies`,
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