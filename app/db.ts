import { v4 as uuidv4 } from "uuid";

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

export const findArticleById = async (db: D1Database, id: string) => {
  return await db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .bind(id)
    .first<Article>();
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

export const createArticle = async (db: D1Database, content: string) => {
  await db
    .prepare("INSERT INTO articles (id, content) VALUES (?, ?)")
    .bind(uuidv4(), content)
    .run();
};
