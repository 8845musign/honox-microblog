import {} from "hono";
import type { D1Database } from "@cloudflare/workers-types" }

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: {
      DB: D1Database
    };
  }
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head
    ): Response | Promise<Response>;
  }
}
