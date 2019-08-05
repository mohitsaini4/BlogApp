var express= require("express");
var mongoose= require("mongoose");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/BlogApp', {useNewUrlParser: true});
