import { renderFooter } from "./components/footer";
import { renderHeader } from "./components/header";
import { renderMain } from "./components/main";
import { loadViewTemplate } from "./template";

const layoutTemplate = loadViewTemplate("layout.html");

export function renderLayout(): string {
  return layoutTemplate
    .replace("{{header}}", renderHeader())
    .replace("{{main}}", renderMain())
    .replace("{{footer}}", renderFooter());
}
