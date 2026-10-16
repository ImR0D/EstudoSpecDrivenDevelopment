import { loadViewTemplate } from "../template";

const footerTemplate = loadViewTemplate("footer.html");

export function renderFooter(): string {
  return footerTemplate;
}
