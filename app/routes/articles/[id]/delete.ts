import { createRoute } from "honox/factory";
import { deleteArticle } from "@/db";

export const POST = createRoute(async (c) => {
  const { id } = c.req.param();
  await deleteArticle(c.env.DB, id);

  return c.redirect("/");
});
