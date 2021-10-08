

const userModel = require("../model/UserModel.js");





//get users

exports.getUserListing = (req,res)=>{



    userModel.find()

    .then((users)=>{

        res.json({


            message: "A list of all the users in the database",
            data: users,
            total: users.length
    })
       
    })
    .catch(err=>{
        res.status(500).json({

            message: `Error ${err}`,
        })

    })

};

//Add User

exports.addAUser = (req,res)=>{

    const data = req.body;

    console.log(req.body);

    const newUser = new userModel(data);

    newUser.save()
    .then((user)=>{
        res.json({

            message: `The user was successfully created`,
            data: user
        })
       
    })
    .catch(err=>{
        res.status(500).json({

            message: `Error ${err}`,
        })

    })
   
};