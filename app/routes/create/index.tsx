import { createRoute } from "honox/factory";
import { createArticle } from "../../db";
import { basicAuth } from "hono/basic-auth";

export const GET = createRoute(
  basicAuth({ username: "test", password: "test" }),
  async (c) => {
    return c.render(
      <div>
        <form method="post">
          <input type="text" name="title" required />
          <textarea cols={30} rows={10} name="content" required></textarea>
          <button type="submit">ポスト</button>
        </form>
      </div>,
      { title: "投稿" }
    );
  }
);

export const POST = createRoute(async (c) => {
  const result = await c.req.parseBody<{ title: string; content: string }>();
  console.log(result);
  await createArticle(c.env.DB, {
    title: result.title,
    content: result.content,
  });
  return c.redirect("/");
});
