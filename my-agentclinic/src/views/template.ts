import { readFileSync } from "node:fs";
import { join } from "node:path";

export function loadViewTemplate(templateName: string): string {
  return readFileSync(join(__dirname, "templates", templateName), "utf8");
}
