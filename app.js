const express = require("express");
const app = express();

// Serve static file
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server started!");
});

app.get('/', (req, res) => {
    res.render("index.ejs");
});