var express= require("express");
var mongoose= require("mongoose");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/BlogApp', {useNewUrlParser: true});

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created:{type: Date, default:Date.now}
});
var Blog = mongoose.model("blogs", blogSchema);

//IndexRoutes
app.get("/blogs",function(req, res){
	Blog.find({},function(err, blog){
		if(err){
			res.send("error");
		} else{
			res.render("index", {blogs: blog});
		}
	});
	
});

// new routes
app.get("/blogs/new", function(req, res){
	res.render("new.ejs");
});



app.listen(8000, function(){
	console.log("Server Started");
});
