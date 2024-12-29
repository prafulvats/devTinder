const adminAuthenticate = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if(!isAdminAuthenticated) {
        res.send("Login with admin first");
    } else {
        next();
    }
}
module.exports = {
    adminAuthenticate
}