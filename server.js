const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); //specifying the configuration file

const port = process.env.PORT || 8000;
const DB = process.env.DATABASE_LOCAL; //getting the variable from config file

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with database successfully");
  });

const app = require("./app");
//creating server
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
