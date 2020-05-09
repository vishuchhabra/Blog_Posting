const express = require('express')
const  app  =  express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const cors = require("cors")
const mongodb = require('mongodb')


//Routes
const blogRecord = require("./api/routes/blogRecord")

//middlewares

//cors and morgan
app.use(cors())
app.use(morgan("dev"))

//bodyparser for the json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//routes middleware

app.use("/blog",blogRecord)

//errors

// 404 Not Found
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
  });
  
  // Errors
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    })
  })

//connecting the local database
mongoose.connect('mongodb://localhost/blogdatabase', 
{ useUnifiedTopology: true , useNewUrlParser: true})
.then(result=>
{
    console.log("Local Database has been connected")

})
.catch(err=>
{
    console.log(err)
})


//exporting the app  
module.exports = app;
