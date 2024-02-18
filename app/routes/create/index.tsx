import { createRoute } from "honox/factory";
import { createArticle } from "../../db";

export const GET = createRoute(async (c) => {
  return c.render(
    <div>
      <form method="post">
        <textarea cols={30} rows={10} name="content"></textarea>
        <button type="submit">ポスト</button>
      </form>
    </div>,
    { title: "投稿" }
  );
});

export const POST = createRoute(async (c) => {
  const result = await c.req.parseBody<{ content: string }>();
  console.log(result);
  await createArticle(c.env.DB, result.content);
  return c.redirect("/");
});
