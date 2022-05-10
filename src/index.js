const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/Route/route')
const { default: mongoose } = require('mongoose');
const app = express();

//body parser is a middleware, used to process data sent through an HTTP request body.
app.use(bodyParser.json());//transforms the text-based JSON input into JS-accessible variables
app.use(bodyParser.urlencoded({ extended: true }));//extended: true precises that the req.body object will contain values of any type instead of just strings.

//a framework that helps to establish a connection b/w node and mongoDB
mongoose.connect("mongodb+srv://shradha_24:Ourcloudy007@cluster0.tovfx.mongodb.net/group07Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))//return fullfiled promise
.catch ( err => console.log(err) )//return rejected promise

app.use('/', route)

//port is two-way communication link between two programs running on the network
app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});