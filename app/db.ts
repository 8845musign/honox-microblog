export type Article = {
  id: string;
  content: string;
  created_at: string;
};

export const findAllArticles = async (db: D1Database) => {
  const { results } = await db
    .prepare("SELECT * FROM articles ORDER BY created_at DESC")
    .all<Article>();
  const articles = results;
  console.log("find");
  return articles;
};

export const initilizeDatabase = async (db: D1Database) => {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS articles ( id TEXT PRIMARY KEY, created_at TEXT DEFAULT (datetime('now')), content TEXT )"
    )
    .run();
  await db
    .prepare(
      "INSERT OR IGNORE INTO articles (id, content) VALUES (1, 'こんにちは'), (2, 'Hello');"
    )
    .run();
};
