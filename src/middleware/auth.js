var jwt = require('jsonwebtoken');
const { User } = require("../models/user")

const adminAuthenticate = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthenticated = token === "xyzj";
    if(!isAdminAuthenticated) {
        res.send("Login with admin first");
    } else {
        next();
    }
}

//Middleware for checking if the token is valid or not, if it's valid then fetch userId after that fetch the user data
const userAuth = async (req, res, next) => {
    try {
        // Validate cookie
        const cookies = req.cookies;
        const { token } = cookies;
        if(!token) {
            throw new Error("Invalid token");
        }
        const decodedMessage = await jwt.verify(token, "Nike@12345"); // This will return the object created by JWT inside that there will be a logged in user _id
        const { _id } = decodedMessage;
        const profileData = await User.findById(_id);
        if(!profileData) {
            throw new Error("User does not exist in DB");
        }
        req.profileData = profileData;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    adminAuthenticate,
    userAuth
}