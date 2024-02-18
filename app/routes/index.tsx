import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Counter from "../islands/counter";
import { basicAuth } from "hono/basic-auth";

import type { Article } from "../db";
import { findAllArticles, initilizeDatabase } from "../db";

const className = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap");
  font-family: sans-serif;
  font-family: "Noto Serif JP", serif;
  font-weight: 400;
  font-style: normal;
`;

export default createRoute(
  basicAuth({ username: "test", password: "test" }),
  async (c) => {
    await initilizeDatabase(c.env.DB);
    const articles = await findAllArticles(c.env.DB);

    const name = c.req.query("name") ?? "Hono";
    return c.render(
      <div class={className}>
        <h1>Hello, {name}!</h1>
        <Counter />

        {articles.map((article: Article) => (
          <div key={article.id}>
            <p>{article.content}</p>
            <p>{article.created_at}</p>
          </div>
        ))}

        <a href="/create">POST</a>
      </div>,
      { title: name }
    );
  }
);
