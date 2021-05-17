const mongoose = require("mongoose");

const users = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    country: String,
    email: String,
    password: String
});

const articles = new mongoose.Schema({
    title: String,
    description: String,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
});

//create model {object}
const User1 = mongoose.model("User", users); //User(s) is the name in DB
const Article1 = mongoose.model("Article", users);

//Export model
module.exports.User = User1; // "User" in 19 line has nothing to do with User here
module.exports.Article = Article1; // "Article" in 20 line has nothing to do with User here

//key and value for (module.exports) object