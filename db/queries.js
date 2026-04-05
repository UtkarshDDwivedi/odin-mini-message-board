const pool = require('./pool');
const { randomUUID } = require('crypto');

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return rows;
}

async function insertMessage(user, text) {
  await pool.query(
    "INSERT INTO messages (id, username, text) VALUES ($1, $2, $3)",
    [randomUUID(), user, text]
  );
}

async function searchMessage(id) {
    const {rows} = await pool.query(
        "SELECT * FROM messages WHERE id = $1",
        [id]
    );

    return rows[0];
}

async function deleteAllMessages() {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteAllMessages,
  searchMessage
};