const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');


//@desc     add new user
//@route    POST /api/users
//@access   Public
const setNewUser = async(req, res, next) => {
    const {email, name, password} = req.body;
    
    try {
        if(!email || !password || !name) {
            res.status(400);
            throw new Error("Please provide all data!");
        }

        const emailFound = await User.findOne({email});

        if(emailFound){
            res.status(400);
            throw new Error("User exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            name,
            password: hashedPassword
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (error) {
        console.log(error)
        next(error)
    }
};

//@desc     login user
//@route    POST /api/users/login
//@access   Public
const loginUser = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(user && await bcrypt.compare(password, user.password)){
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: generateToken(user.id)
            })
        }else{
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
} 

//@desc     get registered user
//@route    POST /api/users/me
//@access   Private
const getMe = async(req, res, next) => {
    try {
        res.status(200).json({
            ...req.user
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    setNewUser,
    loginUser,
    getMe
}