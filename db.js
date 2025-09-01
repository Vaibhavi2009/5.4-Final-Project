/* db.js - SQLite connection + schema */
const path = require('path');
const Database = require('better-sqlite3');

const dbFile = path.join(__dirname, 'data', 'census.sqlite');
const db = new Database(dbFile);
db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS census (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    num_people INTEGER NOT NULL,
    year INTEGER NOT NULL,
    taker TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;