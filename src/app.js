const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("hello from server test");
});

app.use("/", (req, res) => {
    res.send("hello from server Hi bye bye Hi");
});

app.listen(7778, () => {
    console.log('Server running!')
});