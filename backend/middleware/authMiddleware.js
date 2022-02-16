const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const auth = async(req, res, next) => {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            if(!token){
                res.status(401)
                throw new Error("Invalid token")
            }
            
            const {id} = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(id).select("-password");
            if(!user){
                res.status(401)
                throw new Error("Invalid user");
            }
            req.user = user;
            next()
        }else{
            res.status(401)
            throw new Error("Unauthorized access")
        }
    } catch (error) {
        next(error);
    }
}

module.exports = auth;