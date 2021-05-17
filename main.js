const express = require("express");
const { uuid } = require('uuidv4');

//database requirement
const db = require("./db");
//model requirement
const { User, Article } = require("./schema"); // User and Article can be changed to anything

const app = express();
const PORT = 5000;

app.use(express.json());

const articles = [{
        id: 1,
        title: 'How I learn coding?',
        description: 'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
    {
        id: 2,
        title: 'Coding Best Practices',
        description: 'Lorem, ipsum dolor sit, Quam, mollitia.',
        author: 'Besslan',
    },
    {
        id: 3,
        title: 'Debugging',
        description: 'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
];
//PART II
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
const deleteArticlesByAuthor = (req, res, next) => {
    const articleAuthor = req.body.author;

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
};
app.delete("/articles", deleteArticlesByAuthor);


//6. deleteAnArticleById
const deleteAnArticleById = (req, res, next) => {
    const articleId = JSON.parse(req.params.id);

    if (articleId < articles.length) {
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
};
app.delete("/articles/:id", deleteAnArticleById);


//5. updateAnArticleById
const updateAnArticleById = (req, res, next) => {
    const articleId = JSON.parse(req.params.id);

    let i;
    const found = articles.find((element, index) => {
        i = index;
        return element.id === articleId;
    });

    for (const key in req.body) {
        found[key] = req.body[key];
    };

    found.id = articleId;

    articles.splice(i, 1, found);

    res.status = 200;
    res.json(found);
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

    newArticle.id = uuid();

    // articles.push(newArticle);
    newArticle
        .save()
        .then((result1) => {
            res.status(201);
            res.json(result1);
        })
        .catch((err) => {
            res.json(err);
        })

    // res.status = 201;
    // res.json(newArticle);
};
app.post("/articles", createNewArticle);


//3. getAnArticleById
const getAnArticleById = (req, res, next) => {
    const articleId = JSON.parse(req.query.id);
    console.log(articleId)
    const byId = articles.filter((element) => {
        // console.log("element.id=", element.id)
        // console.log("articleId=", articleId)
        return element.id === articleId;
    });
    res.status = 200;
    res.json(byId);
};
app.get("/articles/search_2", getAnArticleById);


//2. getArticlesByAuthor
const getArticlesByAuthor = (req, res, next) => {
    const authorName = req.query.author;

    const byAuthor = articles.filter((element) => {
        return element.author === authorName;
    });
    res.status = 200;
    res.json(byAuthor);
};
app.get("/articles/search_1", getArticlesByAuthor);


//1. getAllArticles
const getAllArticles = (req, res, next) => {
    res.status = 200;
    res.json(articles);
};
app.get("/articles", getAllArticles);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});