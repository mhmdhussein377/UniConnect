const User = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const {createError} = require("./../utils/error")
const nodemailer = require("nodemailer");
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

const Login = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User
            .findOne({email})
            .populate({
                path: "joinedCommunities",
                select: "_id name privacy",
                populate: {
                    path: "creator",
                    select: "username"
                }
            })
            .populate({
                path: "createdCommunities",
                select: "_id name privacy",
                populate: {
                    path: "creator",
                    select: "username"
                }
            })
            .populate({path: "friends", select: "_id name username profile.profileImage"});
        if (!user) 
            return next(createError(401, "Wrong credentials"));
        
        user.online = true
        await user.save()

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) 
            return next(createError(401, "Wrong credentials"));
        
        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {expiresIn: "1hr"});

        const {
            password: pass,
            ...others
        } = user._doc;

        return res
            .status(200)
            .json({
                ...others,
                token
            });
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
};

const GoogleLogin = async(req, res) => {
    try {
        const {sub, email, name, picture} = req.body;
        let username = email.split("@")[0];

        const existingUser = await User.findOne({googleId: sub});

        if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, process.env.SECRET_KEY, {});

            const {
                googleId,
                ...others
            } = existingUser._doc;
            return res
                .status(200)
                .json({user: others, token});
        }

        const newUser = new User({
            googleId: sub,
            email,
            username,
            name,
            profile: {
                profileImage: picture
            }
        });

        await newUser.save();

        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY, {});

        const {
            googleId,
            ...others
        } = newUser._doc;
        res
            .status(201)
            .json({user: others, token});
    } catch (error) {
        console.error("Error during registration:", error);
        res
            .status(500)
            .json({error: "Registration failed"});
    }
};

const ForgotPassword = async(req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        console.log(user)

        if (!user) 
            return res.status(404).json({status: "User doesn't exist"});
        
        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {});

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mohammad.hussein377@gmail.com",
                pass: "svre npuj glbm xnug"
            }
        });

        var mailOptions = {
            from: "mohammad.hussein377@gmail.com",
            to: email,
            subject: "Reset your password",
            text: `http://localhost:5174/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res
                    .status(200)
                    .json({status: "Success"});
            }
        });
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const ResetPassword = async(req, res) => {
    const {password} = req.body
    const {userId, token} = req.params

    try {
        jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
            if (err) 
                return res.json({message: "Token not valid"})

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = await User.findById(userId)
            if (!user) 
                return res.status(404).json("User not found")

            await user.updateOne({password: hashedPassword})
            return res
                .status(200)
                .json("Password updated successfully")
        })
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const Logout = async(req, res) => {
    const {userId} = req.body

    try {
        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                online: false
            }
        })
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        return res
            .status(200)
            .json({message: "User logged out successfully"})
    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

module.exports = {
    Login,
    Register,
    GoogleLogin,
    ForgotPassword,
    ResetPassword,
    Logout
};