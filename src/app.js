const express = require("express");
const { connectDb } = require("./config/database")
const { User } = require("./models/user")
const { validateSignUp } = require("./utils/helper")
const bcrypt = require("bcrypt");
const app = express();

//For converting JSON into JS object
app.use(express.json());

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
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            throw new Error("Invalid Credentials");
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword) {
                res.send('Login Successfull');
            } else {
                throw new Error("Invalid Credentials");
            }
        }
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

