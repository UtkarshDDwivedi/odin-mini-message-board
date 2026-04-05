const db = require('./db/queries');

async function messagesGet(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini Message Board", messages });
}

async function messagesNewGet(req, res) {
    res.render("form", { title: "Mini Message Board"});
}

async function messagesNewPost(req, res) {
  const { user, text } = req.body;

  await db.insertMessage(user, text);

  res.redirect("/");
}

async function searchMessage(req, res) {
    const {messageID} = req.params;
    const message = await db.searchMessage(messageID);

    if (!message) {
        return res.status(404).send("Message not found");
    }

    res.render("message", {title: "Mini Message Board", message});
}

async function deleteAllMessages(req, res) {
  await db.deleteAllMessages();
  res.redirect("/");
}

module.exports = {
    messagesGet,
    messagesNewGet,
    messagesNewPost,
    searchMessage
}