import { createRoute } from "honox/factory";

import { findArticleById, updateArticle } from "@/db";

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const article = await findArticleById(c.env.DB, id);

  if (!article) {
    return c.notFound();
  }

  const name = c.req.query("name") ?? "Hono";

  return c.render(
    <div>
      <form method="post">
        <input type="hidden" name="id" value={article.id} />
        <input type="text" name="title" value={article.title} />
        <textarea name="content">{article.content}</textarea>
        <button type="submit">保存</button>
      </form>

      <form action={`/articles/${article.id}/delete`} method="post">
        <button type="submit">削除</button>
      </form>
    </div>,
    {
      title: name,
    }
  );
});

export const POST = createRoute(async (c) => {
  const result = await c.req.parseBody<{
    id: string;
    title: string;
    content: string;
  }>();

  await updateArticle(c.env.DB, result.id, {
    title: result.title,
    content: result.content,
  });
  return c.redirect(`/articles/${result.id}`);
});
