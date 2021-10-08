

const movieModel = require("../model/MoviesModel.js")



exports.getAllMovieListing =(req,res)=>{

    

            res.json({
            message : "A list of Movies in the database",
            data: movieModel.getAllProducts(),
            total: movieModel.getAllProducts.length
           

    })
    
};




//ROUTE #2
//GET A SPECIFIC USER

exports.getSingleMovie=(req,res)=>{

    const id = parseInt(req.params.id);
    console.log(id)

    const userFound = movieModel.getAProduct(id)

    console.log(userFound)
    if(userFound != undefined)
    {
        res.json({
            message : `Details of product with the id ${userFound.id}`,
            data:userFound
        })
    }

    else
    {
        res.status(404).json({
            message : `Product with id ${id} was not found`
        })
    }

};


//ROUTE 3 
//CREATE A USER

exports.addAMovie=(req,res)=>{

    movieModel.createProduct(req.body);

    res.json({
        message: `The user was successfully created`,
        data : req.body
    })

};


//4th Routh
exports.getMovieGenre=(req,res)=>{

    const genre = req.params.genre;
    console.log(genre)

    const movieFound = movieModel.getMovieGenre(genre)

    console.log(movieFound)
    if(movieFound != undefined)
    {
        res.json({
            message : `Details of Movie with Genre ${movieFound.genre}`,
            data:movieFound
        })
    }

    else
    {
        res.status(404).json({
            message : `Movie with genre ${genre} was not found`
        })
    }

};


// exports.updateAMovie = (req,res)=>{



// };

// exports.deleteAMovie = (req,res)=>{



// };