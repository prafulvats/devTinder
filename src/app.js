const express = require("express");
const { connectDb } = require("./config/database")
const { User } = require("./models/user")
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

// app.delete('/user', (req, res) => {
//     res.send("Data deleted successfully");
// });

app.post('/signUp', async (req, res) => {
    // Creating instance of model
    // const users = new User(req.body); 
    try {
        await User(req.body).save();
        res.send("Data saved successfully")
    } catch(err) {
        res.send("Some error is there while saving")
    }
})

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
        await User.findByIdAndUpdate(userId, data)
        res.send("User updated successfully");
    } catch (error) {
        res.send("Some issue with Updation");
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

