const express = require("express");
const { connectDb } = require("./config/database")
const { User } = require("./models/user")
const { validateSignUp } = require("./utils/helper")
const { userAuth } = require("./middleware/auth")
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require('jsonwebtoken');
const app = express();

//For converting JSON into JS object
app.use(express.json());
app.use(cookie());

// This will only handle get call for /user
app.get("/user", (req, res) => {
    console.log(req.query)
    res.send({"firstName": "praful", "lastName": "vats"})
});

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send({"firstName": "praful", "lastName": "vats"})
});

app.post('/user', (req, res) => {
    res.send("Data saved successfully");
});


//SignUp User
app.post('/signUp', async (req, res) => {
    // Creating instance of model
    // const users = new User(req.body); 
    try {
        validateSignUp(req);
        const { firstName, lastName, email, password } = req.body;
        //Hashing a password (Encryption using bcrypt library)
        const passwordhash = await bcrypt.hash(password, 10);
        await User({firstName, lastName, email, password: passwordhash}).save();
        res.send("Data saved successfully");
    } catch(err) {
        console.log(err.message, "message")
        res.status(400).send(err.message);
    }
})

//SignIn User
app.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Invalid Credentials");
        } else {
            // const validPassword = await bcrypt.compare(password, user.password);
            const validPassword = await user.validatePassword(password);
            if(validPassword) {
                //Create a JWT token
                // const token = await jwt.sign({ _id: user._id}, "Nike@12345", { expiresIn: '1h' }) // Hiding the userId in token , Secret Key at server only. Add Token Expiry
                const token = await user.getJWT();
                //Setting token with Expiry
                res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                res.send('Login Successfull');
            } else {
                throw new Error("Invalid Credentials");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Get profile
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.profileData;
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Send Connection Request
app.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const user = req.profileData;
        res.send(`${user.firstName} send connection request`);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Get all users
app.get('/feed', async (req, res) => {
    try {
      const usersList = await User.find({});
      res.send(usersList);
    } catch (err) {
        res.send("Error while feching data");
    }
})

// Get User by email

//Delete User
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
    //    await User.findByIdAndDelete(userId);
       await User.findByIdAndDelete({_id: userId});
       res.send("User deleted Successfully");
    } catch (error) {
        res.send("Some issue with User Deletion");
    }
})

//Update data of the user
app.patch("/user", async (req, res) => {
    const userId  = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate(userId, data, {runValidators: true})
        res.send("User updated successfully");
    } catch (error) {
        res.send(error);
    }
})

//Order of the routes matter a lot

app.use("/test", (req, res) => {
    res.send("hello from server test");
});

app.use("/", (req, res) => {
    res.send("hello from server Hi bye bye Hi");
});

//Connect with the database first then start the app/server
connectDb().then(()=>{
    console.log("database connection establised...");
    app.listen(7778, () => {
        console.log('Server running!')
    });
}).catch(err=> {
    console.log("database cannot be connected!!");
})

