const { adminAuthenticate } = require("./middleware/auth");
const express = require("express");

const app = express();

app.use("/admin", adminAuthenticate)
app.get("/admin", 
    (req, res, next) => {
    next();
    },
    (req, res) => {
    res.send("hello");
    }
);

app.get("/admin/profile", (req, res) => {
    res.send("Admin profile check");
})
// app.get("/admin/profile", adminAuthenticate, (req, res) => {
//     res.send("Admin profile check");
// })

app.listen(7777, () => {
    console.log("Server started at 7777");
});