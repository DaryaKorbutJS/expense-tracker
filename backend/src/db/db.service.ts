import BetterSqlite3, { Database } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH;
if (!dbPath) {
  throw new Error('DB_PATH is not defined in .env');
}

const fullPath = path.resolve(dbPath);
const dir = path.dirname(fullPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

let db: Database;
try {
  db = new BetterSqlite3(fullPath, { verbose: console.log });
} catch (err) {
  console.error('Failed to connect to SQLite database:', err);
  process.exit(1);
}

// Initialize schema
const initStmt = `
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATETIME NOT NULL
);
`;
db.exec(initStmt);

export default db;