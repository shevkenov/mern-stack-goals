const bcrypt = require("bcryptjs");

const encryptUser = async (req, res, next) => {
    const { email, password, name} = req.body;

    if(!email || !password || !name) {
        res.status(400);
        throw new Error("Please provide all data!")
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        req.user = {
            email, password: hashedPassword, name
        }

        next();
    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    encryptUser
}