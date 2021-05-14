const express = require("express");

const app = express();
const PORT = 5000;


app.get("/", (req, res, next) => {
    res.json("hello from server");
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});