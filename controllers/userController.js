const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUSer = asyncHandler(async (req, res) => {
    const{username,password,email}= req.body;
    if(!username || !password || ! email){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id: user.id,email : user.email})
    }
    else{
        res.status(400)
        throw new Error("User data not available")
    }
  res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    const{email,password} = req.body;
    if(!password || ! email){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"5m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("password is not valid")

    }
  res.json({ message: "Login user" });
});

const currentUser = asyncHandler(async (req, res) => {

  res.json(req.user);
});

module.exports = { registerUSer, loginUser, currentUser };
