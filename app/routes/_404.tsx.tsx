import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  return c.render(
    <div>
      <h1>ないよ</h1>
    </div>,
    { title: "404 Not Found" }
  );
});
