import { v4 as uuidv4 } from "uuid";

import initSql from "@/schemes/init.sql?raw";
import articleTestSql from "@/schemes/articles-test.sql?raw";
import { removeNewlines } from "@/utils/text";

export type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
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
  await db.prepare(removeNewlines(initSql)).run();
  await db.prepare(removeNewlines(articleTestSql)).run();
};

export const createArticle = async (
  db: D1Database,
  payload: {
    title: string;
    content: string;
  }
) => {
  await db
    .prepare("INSERT INTO articles (id, title, content) VALUES (?, ?, ?)")
    .bind(uuidv4(), payload.title, payload.content)
    .run();
};
