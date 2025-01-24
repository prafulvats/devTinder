const express = require("express");
const { connectDb } = require("./config/database")
const { User } = require("./models/user")
const { authRouter } = require("./routes/auth")
const { profileRouter } = require("./routes/profile")
const { requestRouter } = require("./routes/request")
const cookie = require("cookie-parser");
const app = express();

//For converting JSON into JS object
app.use(express.json());
app.use(cookie());
app.use('/', authRouter, profileRouter, requestRouter);

//NOTE: Order of the routes matter a lot

// This will only handle get call for /user
app.get("/user", (req, res) => {
    console.log(req.query)
    res.send({"firstName": "praful", "lastName": "vats"})
});

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send({"firstName": "praful", "lastName": "vats"})
});

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

app.use("/test", (req, res) => {
    res.send("hello from server test");
});

app.use("/", (req, res) => {
    res.send("hello from server Hi bye bye Hi");
});

//Connect with the database first then start the app/server
connectDb().then(()=>{
    console.log("database connection establised...");
    app.listen(7777, () => {
        console.log('Server running!')
    });
}).catch(err=> {
    console.log("database cannot be connected!!");
})

