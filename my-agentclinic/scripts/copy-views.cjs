const { copyFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const source = join(__dirname, "..", "src", "views", "home.html");
const destination = join(__dirname, "..", "dist", "views");

mkdirSync(destination, { recursive: true });
copyFileSync(source, join(destination, "home.html"));
