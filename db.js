const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error', err.message);
    } else {
        console.log('successful');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS discussions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    comment TEXT
  )`);
});

module.exports = db;
