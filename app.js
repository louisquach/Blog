//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const posts = [];
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogPostDB", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

const postSchema = {
  title: String,
  content: String
};
 const Post = mongoose.model("Post", postSchema);
 const home = new Post({
   title: "Home",
   content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
 });
const about = new Post({
  title: "About",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});
const contact = new Post({
  title: "Contact",
  content:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Post.find({},function (err,collectionFund) {
    if (err) {
      console.log(err);
    } else {
    res.render("home", {
      pageName: home.title,
    paragraph1: home.content,
    newPost: collectionFund,
  });}
  });
})

app.get("/posts/:titleId", function(req,res) {
  const postsId = _.lowerCase(req.params.titleId);
  posts.forEach(function(post){
    const postId = _.lowerCase(post.title);
    if (postsId === postId) {
    res.render("post", {pageTitle: post.title, pageContent: post.content})
  } else {
    res.render("post", {pageTitle: "Page not found", pageContent: "Try again"})
  }
  })
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  const post = {
    title: _.capitalize(req.body.title),
    content: _.capitalize(req.body.content)
  };
  posts.push(post);
  Post.insertMany(posts,function(err) {
    if (err) {
      console.log("There is an error");
    } else {
      console.log("Success added to DB");
    }
  });
  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
