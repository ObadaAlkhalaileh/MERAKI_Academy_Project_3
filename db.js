const mongoose = require("mongoose");

require("dotenv").config();

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

// connecting mongoose
mongoose.connect(process.env.DB_URI, options).then(
    () => {
        console.log("project_3_v01 DB is Ready To Use");
    },
    (err) => {
        console.log(err);
    }
);