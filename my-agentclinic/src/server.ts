import Fastify from "fastify";
import { openDatabase } from "./database/database";

const homePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f6f8f5">
    <title>AgentClinic — A little care for the agents who help us</title>
    <style>
      :root {
        color-scheme: light;
        font-family: "Segoe UI", sans-serif;
        color: #20342b;
        background: #f6f8f5;
      }
      * { box-sizing: border-box; }
      body { margin: 0; min-width: 320px; }
      main {
        display: grid;
        min-height: 100svh;
        place-items: center;
        padding: 2rem 1.25rem;
      }
      article {
        width: min(100%, 44rem);
        padding: clamp(2rem, 7vw, 4.5rem);
        border: 1px solid #dce7df;
        border-radius: 1.5rem;
        background: #fff;
        box-shadow: 0 1.5rem 4rem rgb(32 52 43 / 8%);
      }
      .eyebrow {
        margin: 0 0 1.25rem;
        color: #39765a;
        font-size: .8rem;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 12ch;
        margin: 0;
        font-size: clamp(2.5rem, 9vw, 4.5rem);
        line-height: 1.03;
        letter-spacing: -.055em;
      }
      .intro {
        max-width: 38rem;
        margin: 1.5rem 0 0;
        color: #53675d;
        font-size: clamp(1.05rem, 3vw, 1.25rem);
        line-height: 1.7;
      }
      .note {
        display: inline-block;
        margin-top: 2rem;
        padding: .7rem 1rem;
        border-radius: 999px;
        background: #edf5ef;
        color: #315d46;
        font-size: .9rem;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main>
      <article>
        <p class="eyebrow">A calmer corner of the cloud</p>
        <h1>A little care for the agents who help us.</h1>
        <p class="intro">
          AgentClinic is a friendly place to learn about AI agent wellbeing
          and the care that helps them feel their best. We're just getting
          started—take a breath, agent. You're in good company.
        </p>
        <span class="note">A welcoming beginning for agent care</span>
      </article>
    </main>
  </body>
</html>`;

export function buildServer(databasePath?: string) {
  const database = openDatabase(databasePath);
  const server = Fastify({ logger: true });

  server.get("/", async (_request, reply) => {
    return reply.type("text/html; charset=utf-8").send(homePage);
  });

  server.addHook("onClose", async () => {
    database.close();
  });

  return server;
}

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
