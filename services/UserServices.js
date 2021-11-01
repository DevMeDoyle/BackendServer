const sgMail = require('@sendgrid/mail')

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

    const newUser = new userModel({

        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password

    });

		newUser.save()
		.then((user)=>{

			sgMail.setApiKey(process.env.SINGLE_API_KEYS)
			const msg = {
				to:`${req.body.email}`, // Change to your recipient
				from: 'doyledavid5@gmail.com', // Change to your verified sender
				subject: 'Welcome to jdmovies',
				text: 'd',
				html: `<h1> ${req.body.firstName}  ${req.body.lastName} </h1> <p> You have been registered with jdmovies </p>`}


          sgMail.send(msg)
          .then((response) => {

			console.log(response)
            res.json({

				message: `The user was successfully created`,
				data: user
			})

          })
          .catch((error) => {
          	console.error(error)
          })

    	}) // end of then
   
};