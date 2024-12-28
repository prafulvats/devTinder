const express = require("express");

const app = express();

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

app.delete('/user', (req, res) => {
    res.send("Data deleted successfully");
});

//Order of the routes matter a lot

app.use("/test", (req, res) => {
    res.send("hello from server test");
});

app.use("/", (req, res) => {
    res.send("hello from server Hi bye bye Hi");
});

app.listen(7778, () => {
    console.log('Server running!')
});