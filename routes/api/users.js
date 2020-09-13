const express= require('express');
const router= express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../../config/keys');
const passport = require('passport'); 
const User=require('../../models/User');
const validateInput = require('../../validation/login');

router.get('/test', (req,res) => res.json({msg:"Users works"}));

//@route 	post request localohost:5000/api/users/register
//@desc 	Register User
//@access 	Public
router.post('/register', (req,res) => {
    const {errors, isValid} = validateInput(req.body);
//check Validation
if(!isValid){
	return res.status(400).json(errors);
}
    User.findOne({username: req.body.username})
.then(user =>{
	if(user){//if user found then email already exists
		//errors.email="User already exists";
		return res.status(400).json({username:'User already exists'});
	}
	else {
		const newUser=new User({
			username:req.body.username,
			password:req.body.password
		});
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(newUser.password,salt,(err,hash)=>{
				// if(err)
				// 	 throw err;
				newUser.password=hash;
				newUser
				.save()
					.then(user =>res.json(user))
						.catch(err =>console.log(err))
			})

		})
	}
});
});

//@route 	post request localohost:5000/api/users/login
//@desc 	Login User/ JWTToken
//@access 	Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateInput(req.body);
  
    // Check Validation 
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const username = req.body.username;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ username }).then(user => {
      // Check for user
      if (!user) {
        //errors.email = 'User not found';
        return res.status(404).json({username:'User not found'});
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        //return res.status(200).json({msg:'User logged in'});
        } else {
          //errors.password = 'Password incorrect';
            return res.status(400).json({passwod:'Password Incorrect'});
        }
      });
    });
  });

//@route 	post request localohost:5000/api/users/current
//@desc 	returns Current user
//@access 	Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) =>{
		res.json(req.user);
        });
        
module.exports =router;