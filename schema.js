const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, min: 0 },
    country: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.ObjectId, ref: "Role" }
});

const articles = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }]
});

const comments = new mongoose.Schema({
    comment: String,
    commenter: { type: mongoose.Schema.ObjectId, ref: "User" }
});

const roles = new mongoose.Schema({
    role: String,
    permissions: [String]
});

users.pre("save", async function() {
    this.email = this.email.toLowerCase();
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    // await bcrypt.hash(this.password, salt, (err, hash) => {
    //     this.password = hash;
    // });
});

//create model {object}
const User1 = mongoose.model("User", users); //User(s) is the name in DB
const Article1 = mongoose.model("Article", articles);
const Comment1 = mongoose.model("Comment", comments);
const role1 = mongoose.model("Role", roles);

//Export model
module.exports.User = User1; // "User" in 19 line has nothing to do with User here
module.exports.Article = Article1; // "Article" in 20 line has nothing to do with User here
module.exports.Comment = Comment1;
module.exports.Role = role1;
//key and value for (module.exports) object

// console.log(module.exports);