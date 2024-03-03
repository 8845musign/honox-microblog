import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { marked } from "marked";

import { findArticleById } from "../../db";

const className = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap");
  font-family: sans-serif;
  font-family: "Noto Serif JP", serif;
  font-weight: 400;
  font-style: normal;
`;

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const article = await findArticleById(c.env.DB, id);

  if (!article) {
    return c.notFound();
  }

  const content = await marked(article.content);
  const html = { __html: content };

  const name = c.req.query("name") ?? "Hono";

  return c.render(<div class={className} dangerouslySetInnerHTML={html} />, {
    title: name,
  });
});
