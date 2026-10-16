import { loadViewTemplate } from "../template";

const mainTemplate = loadViewTemplate("main.html");

export function renderMain(): string {
  return mainTemplate;
}
