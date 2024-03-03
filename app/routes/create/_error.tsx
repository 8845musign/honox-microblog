import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  return c.render(
    <div>
      <h1>エラー</h1>
    </div>,
    { title: "エラー" }
  );
});
