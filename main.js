const express = require("express");
const { uuid } = require('uuidv4');

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

app.post("/articles", (req, res, next) => {
    const newArticle = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    };
    newArticle.id = uuid()

    articles.push(newArticle);

    res.status = 201;
    res.json(newArticle);
});

app.get("/articles/search_2", (req, res, next) => {
    const articleId = JSON.parse(req.query.id);
    console.log(articleId)
    const byId = articles.filter((element) => {
        // console.log("element.id=", element.id)
        // console.log("articleId=", articleId)
        return element.id === articleId;
    });
    res.status = 200;
    res.json(byId);
});

app.get("/articles/search_1", (req, res, next) => {
    const authorName = req.query.author;

    const byAuthor = articles.filter((element) => {
        return element.author === authorName;
    });
    res.status = 200;
    res.json(byAuthor);
});

app.get("/articles", (req, res, next) => {
    res.status = 200;
    res.json(articles);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});