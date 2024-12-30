const mongoose = require('mongoose');

//Create Schema and Model
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    phoneNo: {
        type: Number
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}