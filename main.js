const express = require("express");
// const { uuid } = require('uuidv4');

//database requirement
const db = require("./db");
//model requirement
const { User, Article, Comment, Role } = require("./schema"); // User and Article can be changed to anything
// console.log("Article=", Article);

const app = express();
const PORT = 5000;

app.use(express.json());

require("dotenv").config();
const SECRET = process.env.SECRET;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");

//3. createNewComment [Level 2]
//this middleware should check the authentication of users
const authentication = async(req, res, next) => {
    const TOKEN = await req.headers.authorization.split(" ")[1]
        // console.log(req.headers.authorization);

    jwt.verify(TOKEN, SECRET, (err, result) => {
        if (err) { res.send(err) }
        next();
    });
};

//PART II
//B.3. createNewComment
const createNewComment = (req, res, next) => {
    const articleId = req.params.id;

    const { comment, commenter } = req.body;
    newComment = new Comment({ comment, commenter });

    newComment.save()
        .then((result1) => {
            res.status(201);
            res.json(result1);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    // console.log(typeof(newComment._id))
    Article.update({ _id: articleId }, { $push: { comments: newComment._id } }, (err, res) => {
        if (err) { res.send(err) };
    });
};
app.post("/articles/:id/comments", authentication, createNewComment);

//A.3. login (Level 2)
const login = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    User.findOne({ email })
        .then((result1) => {
            if (result1) {
                //check if there is a password entered
                if (password === "") {
                    res.status(404);
                    res.json({
                        message: "Please enter a password",
                        status: 404
                    });
                };
                //compare entered pass with hashed pass
                bcrypt.compare(password, result1.password, (err, result) => {
                    //if password is entered and correct
                    if (result) {
                        // sign a jwt (give token)
                        const payload = {
                            userId: result._id,
                            country: result.country
                        };
                        const options = { expiresIn: '60m' };

                        const TOKEN = { token: jwt.sign(payload, SECRET, options) };
                        res.json(TOKEN);
                    };
                    //if password is incorrect
                    if (!result) {
                        res.status(403);
                        res.json({
                            message: "The password you’ve entered is incorrect",
                            status: 403
                        });
                    };
                });

            } else {
                res.status(404);
                res.json({
                    message: "The email doesn't exist",
                    status: 404
                });
            };
        });

    // User.validate({ email: email }, ['email'])
    //     .then((result1) => { res.send("found") })
    //     .catch((err) => { res.send("not found") })
    // err instanceof mongoose.Error.ValidationError; // true
    // Object.keys(err.errors); // ['name']


};
app.post("/login", login);


// 1. createNewAuthor
const createNewAuthor = (req, res, next) => {
    // require data from request
    const { firstName, lastName, age, country, email, password } = req.body;
    // creat instance of User model
    const newAuthor = new User({ firstName, lastName, age, country, email, password });

    newAuthor
        .save()
        .then((result1) => {
            res.status(201);
            res.json(result1);
            next();
        })
        .catch((err1) => {
            res.json(err1);
        });
};
app.post("/users", createNewAuthor);


//7. deleteArticlesByAuthor
const deleteArticlesByAuthor = async(req, res, next) => {
    const articleAuthor = req.body.firstName;
    // const authorId = req.body.author;

    const authorId = await User.find({ firstName: articleAuthor }).then((result) => {
            console.log(typeof(result[0]._id));
            return result[0]._id
        })
        .catch((err) => {
            res.json(err);
        });

    // console.log(authorId);
    Article.deleteMany({ author: authorId }, (err, resp) => {
        if (err) {
            res.status = 404;
            res.json({
                success: false,
                message: `Please enter a valid author name`
            });
        };
        if (resp) { //kept waiting in postman without this condition
            res.status(200);
            res.send({
                success: true,
                message: `Success delete all the articles for the author => ${articleAuthor}`
            });
        };
    });
    /*
        const sortedByAuthor = [];
        articles.forEach((element, index) => {
            if (element.author === articleAuthor) {
                articles.splice(index, 1);
                sortedByAuthor.push(element);
            }
        });
        if (sortedByAuthor[0]) {
            res.status = 200;
            res.json({
                success: true,
                message: `Success delete all the articles for the author => ${articleAuthor}`
            });
        } else {
            res.status = 404;
            res.json({
                success: false,
                message: `Please enter a valid author name`
            });
        };
        */
};
app.delete("/articles", deleteArticlesByAuthor);


//6. deleteAnArticleById
const deleteAnArticleById = (req, res, next) => {
    const articleId = req.params.id;

    Article.deleteOne({ _id: articleId }, (err, resp) => {
        if (err) {
            res.status = 404;
            res.json({
                success: false,
                message: err
            });
        };
        if (resp) { //kept waiting in postman without this condition
            res.status(200);
            res.send({
                success: true,
                message: `Success Delete article with id => ${articleId}`
            });
        };
    });


    /*if (articleId < articles.length) {
            let i;
            let found = articles.find((element, index) => {
                i = index;
                return element.id === articleId;
            });
            articles.splice(i, 1);

            res.status = 200;
            res.json({
                success: true,
                message: `Success Delete article with id => ${articleId}`
            });
        } else {
            res.status = 404;
            res.json({
                success: false,
                message: `Please enter a valid article id --> from (1 to ${articles.length})`
            });
        };
    */
};
app.delete("/articles/:id", deleteAnArticleById);


//5. updateAnArticleById
const updateAnArticleById = (req, res, next) => {
    // const articleId = JSON.parse(req.params.id);
    const articleId = req.params.id;

    // let i;
    // const found = articles.find((element, index) => {
    //     i = index;
    //     return element.id === articleId;
    // });

    //there is another method of using updateOne 3 times 

    if (req.body.title) {
        Article.updateOne({ _id: articleId }, { title: req.body.title }, (err, res) => {
            if (err) { res.send(err) };
        });
    };
    if (req.body.description) {
        Article.updateOne({ _id: articleId }, { description: req.body.description }, (err, res) => {
            if (err) { res.send(err) };
        });
    };
    if (req.body.author) {
        Article.updateOne({ _id: articleId }, { author: req.body.author }, (err, res) => {
            if (err) { res.send(err) };
        });
    };

    Article.find({ _id: articleId })
        .then((result) => {
            res.status(200)
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });

    /*shortcut way -_-
Article.findOneAndUpdate({_id:id}, req.body ,{new:true})
.then((result)=>{
    res.json(result)
})
.catch((err)=>{
    res.json(err)
})
        */

    //-----------------this way didnt work because model instances cant be modified like normal objects
    /*Article.find({ _id: articleId })
        // .exec()
        .then(() => {
            const temp = {};
            // const result =new Article()
            for (const key in req.body) {
                temp[key] = req.body[key];
            };
            // console.log(result);
            const updated = new Article({ title: temp.title })
                // hey.name="ahmad" this way doesnt work!!! this is not normal object

            res.status(200)
            res.json(updated);
        })
        .catch((err) => {
            res.json(err);
        });*/
    //------------

    // for (const key in req.body) {
    //     found[key] = req.body[key];
    // };

    // found.id = articleId;

    // articles.splice(i, 1, found);

    // res.status = 200;
    // res.json(found);
};
app.put("/articles/:id", updateAnArticleById);


//4. createNewArticle
const createNewArticle = (req, res, next) => {
    // const newArticle = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     author: req.body.author
    // };

    const { title, description, author } = req.body;
    const newArticle = new Article({ title, description, author });

    // console.log(newArticle);
    // newArticle.id = uuid();

    // articles.push(newArticle);
    newArticle
        .save()
        .then((result1) => {
            // console.log("result1", result1)
            res.status(201);
            res.json(result1);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });

    // res.status = 201;
    // res.json(newArticle);
};
app.post("/articles", createNewArticle);


//3. getAnArticleById
const getAnArticleById = (req, res, next) => {
    const articleId = req.query.id;
    // console.log(articleId);

    Article.find({ _id: articleId }).populate("author", "firstName")
        // .exec()
        .then((result) => {
            res.status(200)
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
    // const byId = articles.filter((element) => {
    //     // console.log("element.id=", element.id)
    //     // console.log("articleId=", articleId)
    //     return element.id === articleId;
    // });
    // res.status = 200;
    // res.json(byId);
};
app.get("/articles/search_2", getAnArticleById);


//2. getArticlesByAuthor
const getArticlesByAuthor = (req, res, next) => {
    const authorId = req.query.authorId;
    //search_1?authorId=60a2d3633d768c67281e7c74 to postman
    Article.find({ author: authorId })
        .then((result) => {
            res.status(200)
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });

    // const byAuthor = articles.filter((element) => {
    //     return element.author === authorName;
    // });
    // res.status(200);
    // res.json(byAuthor);
};
app.get("/articles/search_1", getArticlesByAuthor);


//1. getAllArticles
const getAllArticles = (req, res, next) => {

    Article.find({})
        .then((result) => {
            res.status(200);
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
    // res.status (200);
    // res.json(articles);
};
app.get("/articles", getAllArticles);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});