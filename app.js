var express= require("express");
var mongoose= require("mongoose");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

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

//CREATE Route
app.post("/blogs", function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.send("error");
		} else {
			res.redirect("/blogs");
		}
	});
	
});

//show route
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.send("error");
		} else {
			res.render("show.ejs" ,{ blog: foundBlog });
		}
	});
});

//edit route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.send("error");
		} else {
			res.render("edit.ejs" ,{ blog: foundBlog });
		}
	});
});

// Update route
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.send("error");
		} else {
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

// destroy route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs");
		}
	});

});

app.listen(8000, function(){
	console.log("Server Started");
});
