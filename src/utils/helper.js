const validate = require("validator");
const bcrypt = require("bcrypt");

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

//validate profile update
const validateProfileUpdate = (req) => {
        const fieldsToEdit = ['firstName', 'lastName', 'age', 'about', 'photoUrl', 'skills', 'phoneNo'];
        const isValidateProfileData = Object.keys(req).every((key) => fieldsToEdit.includes(key));
        if(!isValidateProfileData) {
            throw new Error("Invalid Request");
        }
}

//validation for Change password
const validationForChangePassword = async (req) => {
        const { profileData,  body } = req;
        const { newpassword, reenterpassword} = body;
        const { password } = profileData;
        const compareOldandNew = await bcrypt.compare(newpassword, password);
        console.log(compareOldandNew, 'compareOld')
        // Error: While thowing the Error it's giving error
        // if(!compareOldandNew) {
        //     throw new Error("Incorrect")
        // }
        // console.log(newpassword !== reenterpassword)
        // if(newpassword !== reenterpassword) {
        //     throw new Error("Password should be same in both new password and repeat password field");
        // }
        // else if(!validate.isStrongPassword(newpassword)) { 
        //     throw new Error("Enter valid password");
        // }
        // else if(compareOldandNew) {
        //     throw new Error("Please enter the new password it should not be the old one");
        // }
}

module.exports = {
    validateSignUp,
    validateProfileUpdate,
    validationForChangePassword,
}