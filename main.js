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

app.delete("/articles", (req, res, next) => {
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
});

app.delete("/articles/:id", (req, res, next) => {
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
    }
});

app.put("/articles/:id", (req, res, next) => {
    const articleId = JSON.parse(req.params.id);

    let i;
    let found = articles.find((element, index) => {
        i = index;
        return element.id === articleId;
    });

    found = {
        id: articleId,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    };

    articles.splice(i, 1, found);

    res.status = 200;
    res.json(found);
});

app.post("/articles", (req, res, next) => {
    const newArticle = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    };
    newArticle.id = uuid();

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