import Fastify from "fastify";
import { openDatabase } from "./database/database";
import { registerHomeRoute } from "./routes/home-route";

export function buildServer(databasePath?: string) {
  const database = openDatabase(databasePath);
  const server = Fastify({ logger: true });

  registerHomeRoute(server);

  server.addHook("onClose", async () => {
    database.close();
  });

  return server;
}
