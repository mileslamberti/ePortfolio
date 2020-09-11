require('dotenv').config()
const mongoose = require("mongoose");
const InitiateMongoServer = async () => {
  console.log(process.env.USERNAME)
  //const MONGOURI = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@cluster0.fai1l.azure.mongodb.net/"+process.env.DATABASE_NAME+"?retryWrites=true&w=majority";
  const MONGOURI = "mongodb+srv://abdiaziz:Hello@123@cluster0.fai1l.azure.mongodb.net/eporfolio?retryWrites=true&w=majority";
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;