import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target database file path
const dbDir = path.resolve(__dirname, '../../database');
const dbPath = path.join(dbDir, 'database.sqlite');

// Ensure database folders exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Open SQLite Database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite Database:', err.message);
  } else {
    console.log('Connected to SQLite Database at:', dbPath);
    initializeDatabase();
  }
});

// Run init.sql to bootstrap database
function initializeDatabase() {
  const sqlPath = path.join(dbDir, 'init.sql');
  if (fs.existsSync(sqlPath)) {
    const initSql = fs.readFileSync(sqlPath, 'utf8');
    db.exec(initSql, (err) => {
      if (err) {
        console.error('Error executing database initialization script init.sql:', err.message);
      } else {
        console.log('Database schemas initialized and seeded successfully.');
      }
    });
  } else {
    console.warn('init.sql not found at:', sqlPath);
  }
}

// Promisified helper methods for Repository Pattern
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export default db;
