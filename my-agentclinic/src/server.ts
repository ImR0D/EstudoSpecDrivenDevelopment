import { buildServer } from "./app";

async function startServer(): Promise<void> {
  const server = buildServer();
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? "127.0.0.1";

  try {
    await server.listen({ host, port });
  } catch (error) {
    server.log.error(error, "Unable to start AgentClinic");
    await server.close();
    process.exitCode = 1;
  }
}

if (require.main === module) {
  void startServer();
}
