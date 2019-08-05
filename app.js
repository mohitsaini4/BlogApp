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

Blog.create({
	title: "Dog",
	image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	body: "this is a dog blog"
});

//Routes
app.get("/blogs",function(req, res){
	Blog.find({},function(err, blog){
		if(err){
			res.send("error");
		} else{
			res.render("index", {blogs: blog});
		}
	});
	
});



app.listen(8000, function(){
	console.log("Server Started");
});
