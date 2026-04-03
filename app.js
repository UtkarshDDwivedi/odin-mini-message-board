const express = require('express');
const path = require('node:path');
const crypto = require('node:crypto');

const app = express();
const port = process.env.port || 3000;
const assetPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetPath));
app.use(express.urlencoded({extended: true}));


messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(), 
        id: crypto.randomUUID()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
        id: crypto.randomUUID() 
    }
];


app.get('/', (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
})

app.get('/new', (req, res) => {
    res.render("form", {title: "Mini Message Board"});
})

app.post('/new', (req, res) => {
    messages.push({text: req.body.text, user: req.body.user, added: new Date(), id: crypto.randomUUID()});
    res.redirect('/');
})

app.get('/messages/:messageID', (req, res) => {
    const {messageID} = req.params;
    const message = messages.find(message => message.id == messageID);

    if (!message) {
        return res.status(404).send("Message not found");
    }
    
    res.render("message", {title: "Mini Message Board", message: message});
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});