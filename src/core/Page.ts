import { Component } from "./Component";

export abstract class Page extends Component {
   onPageReady(): void {}

  override onMount(): void {
    this.onPageReady();
  }

  override onUnmount(): void {}
}