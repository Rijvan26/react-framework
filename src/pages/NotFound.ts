import { Page } from "../core/Page";

export class NotFound extends Page {
  render(): string {
    return `
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
    `;
  }

  style(): string {
    return `
      h1 {
        color: red;
      }
    `;
  }
}