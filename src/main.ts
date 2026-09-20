import { AppLayout } from "./layout/Applayout";

const root = document.querySelector("#root") as HTMLDivElement;
// console.log("Root before mount:", root?.innerHTML);
if (!root) {
  throw new Error("root element doesn't exist");
}

function init() {
  const appLayout = new AppLayout();

  appLayout.mount(root);
}

init();
// console.log("Root after mount:", root?.innerHTML);