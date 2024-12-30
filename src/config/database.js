const mongoose = require('mongoose');
const uri = 'mongodb+srv://VatsNode:DpblgHsutpMOQuRc@vatsnode.oi049.mongodb.net/?retryWrites=true&w=majority&appName=VatsNode/devTinder'
const options = {
    tls: true,
    serverSelectionTimeoutMS: 3000,
    autoSelectFamily: false,
  }
const connectDb = async () => {
    await mongoose.connect(uri, options);
}
module.exports = { connectDb }
