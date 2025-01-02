const mongoose = require('mongoose');

//Create Schema and Model
//Schema level validation
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //If user added email in capital it will make it as lowercase
        trim: true, // It will remove the spaces at the end and starting
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        validate(value) { // This function will run on POST only not on Update, we have to enable it for update using runValidators.
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    age: {
        type: Number
    },
    phoneNo: {
        type: Number
    },
    photoUrl: {
        type: String,
        default: "https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png",
    },
    about: {
        type: String,
        default: "This is a default about of the user",
    },
    skills: {
        type: [String],
    }
},{
    timestamps: true, // This will add the createdAt and updatedAt for the inserted data
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}