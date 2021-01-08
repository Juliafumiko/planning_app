const express =  require('express');
const router =  express.Router();
const User =  require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req,res)=>{

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //checking user in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exist');
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res)=>{
    //Validate the data before we a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if the email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('email or password is wrong');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    
    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.tokenSecret);
    res.header('auth-token', token).send(token);

    res.send('logged in')
});



module.exports = router;