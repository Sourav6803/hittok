const express = require('express');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const route = require('./route/route.js');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/hittok?retryWrites=true&w=majority", {
    useNewUrlParser: true
}) 
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});