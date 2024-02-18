CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  content TEXT
);
