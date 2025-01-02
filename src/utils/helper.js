const validate = require("validator");

// Validation of Sign Up fields
// Using Vaidator library for validating Email and password fields

const validateSignUp = (req) => {
 const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("Enter your name");
    } else if(!validate.isEmail(email)) {
        throw new Error("Enter valid Email");
    } else if(!validate.isStrongPassword(password)){
        throw new Error("Enter valid password");
    }
};

module.exports = {
    validateSignUp  
}