import type { FastifyInstance } from "fastify";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderLayout } from "../views/layout";

const homeStyles = readFileSync(join(__dirname, "../views/home.css"), "utf8");

export function registerHomeRoute(server: FastifyInstance): void {
  server.get("/", async (_request, reply) => {
    return reply
      .type("text/html; charset=utf-8")
      .send(renderLayout());
  });

  server.get("/home.css", async (_request, reply) => {
    return reply.type("text/css; charset=utf-8").send(homeStyles);
  });
}
