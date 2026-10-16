import { loadViewTemplate } from "../template";

const headerTemplate = loadViewTemplate("header.html");

export function renderHeader(): string {
  return headerTemplate;
}
