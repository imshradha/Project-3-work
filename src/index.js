const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routes/route");
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://shradha_24:Ourcloudy007@cluster0.tovfx.mongodb.net/group07Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected")).catch(err => console.log(err));

app.use('/', route);

app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});