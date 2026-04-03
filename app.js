const express = require('express');
const path = require('node:path');

const app = express();
const port = 3000;
const assetPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetPath))


messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date() 
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date() 
    }
];


app.get('/', (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});