const { cpSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const source = join(__dirname, "..", "src", "views", "templates");
const destination = join(__dirname, "..", "dist", "views");

mkdirSync(destination, { recursive: true });
cpSync(source, join(destination, "templates"), { recursive: true });
