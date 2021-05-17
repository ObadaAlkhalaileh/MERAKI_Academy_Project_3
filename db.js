const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

// connecting mongoose
mongoose.connect("mongodb://localhost:27017/project_3_v01", options).then(
    () => {
        console.log("project_3_v01 DB is Ready To Use");
    },
    (err) => {
        console.log(err);
    }
);