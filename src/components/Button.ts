import { Component } from "../core/Component";
// import { useState } from "../core/UseState";

interface ButtonProps {
  id:string;
  name:string
  routeName?:string
}

export class Button extends Component {
  public props: ButtonProps;


  constructor(props: ButtonProps) {
    super();

    this.props = props;
  }

  render(): string {
    return `
      <button id="btn"
      data-id="${this.props.id}">
        Click Me: ${this.props.name}
      </button>
    `;
  }

  style(): string {
    return `
      #btn {
        padding: 10px 20px;
        cursor: pointer;
      }
    `;
  }

 override onMount(): void {   //onMount() = "the DOM is ready for this component, so perform component setup."
  // console.log("Button onMount is running");

  const button = document.querySelector(
    `button[data-id="${this.props.id}"]`
  );

  if (!button) {
    return;
  }

  // console.log("✅ Button found:", button);

  button.addEventListener("click", () => {
    // console.log("BUTTON CLICKED");

    button.dispatchEvent(
      new CustomEvent("route", {
        bubbles: true,
        composed: true,
        detail: {
          routeName: this.props.routeName,
        },
      })
    );
  });
}
}