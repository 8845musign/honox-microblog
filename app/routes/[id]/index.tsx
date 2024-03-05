import { createRoute } from "honox/factory";
import { marked } from "marked";

import { findArticleById } from "../../db";
import { Fragment } from "hono/jsx/jsx-runtime";

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const article = await findArticleById(c.env.DB, id);

  if (!article) {
    return c.notFound();
  }

  const content = await marked(article.content);
  const html = { __html: content };

  const name = c.req.query("name") ?? "Hono";

  return c.render(
    <Fragment>
      <h1>{article.title}</h1>

      <div dangerouslySetInnerHTML={html}></div>

      <a href={`/${id}/edit`}>edit</a>
    </Fragment>,
    {
      title: name,
    }
  );
});
