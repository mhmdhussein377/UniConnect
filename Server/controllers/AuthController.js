const User = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const {createError} = require("./../utils/error")
dotenv.config()

const Register = async(req, res, next) => {
    const {name, username, email, password} = req.body;

    try {
        const usernameExists = await User.findOne({username});
        if (usernameExists) 
            return next(createError(400, "Invalid username!"));
        
        const existingUser = await User.findOne({email});
        if (existingUser) 
            return next(createError(400, "User already exists! Login Instead"));
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({name, username, email, password: hashedPassword});
        await user.save();

        res
            .status(201)
            .json({message: "user created successfully"});
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};