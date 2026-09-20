export abstract class Component {
  protected _element: HTMLElement | null = null;
  protected _styleTag: HTMLStyleElement | null = null;

  abstract render(): string;
  abstract style():string;

  mount(parent: HTMLElement): void {

    this._injectStyle()
    const element = this._createElement();
 
    if (!element) return;

    this._element = element;

    parent.appendChild(this._element);

    this.onMount();
  }

  rerender(): void {
  if (this._element === null) return;

  // Run cleanup before replacing the old element
  this.onUnmount();

  // Create the new DOM from the latest render()
  const newElement = this._createElement();

  if (newElement === null) return;

  // Replace old DOM with new DOM
  this._element.replaceWith(newElement);

  // Save the new DOM element
  this._element = newElement;

  // Attach events again
  this.onMount();
}

  unmount(): void {
    this.onUnmount();

    this._element?.remove();

    this._element = null;
  }

  //onMount() = "the DOM is ready for this component, so perform component setup."
   onMount(): void {} 


//    onUnmount()
//     ↓
// "Clean up anything this component was using"

// remove()/replaceWith()
//     ↓
// "Actually remove the old DOM"
   onUnmount(): void {}

  protected _injectStyle(): void {
    const css = this.style().trim();

    if (!css) return;

    const key = this.constructor.name;

    if (document.querySelector(`style[data-aalu="${key}"]`)) {
      return;
    }

    this._styleTag = document.createElement("style");

    this._styleTag.textContent = css;

    this._styleTag.dataset.aalu = key;

    document.head.appendChild(this._styleTag);
  }

   emit(eventName: string, detail?: unknown): void { //emit() is a helper that makes dispatching custom events easier, but it requires the Component to have a valid _element.
  if (!this._element) return;

  this._element.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
    })
  );
}


// render()
//    ↓                         
// HTML string
//    ↓
// <template>
//    ↓
// template.content
//    ↓
// actual DOM element

 // render()          → gives us the design
// _createElement()  → builds the object
// mount()           → puts the object in the room
  private _createElement(): HTMLElement | null {
    const template = document.createElement("template");    

    
    template.innerHTML = this.render().trim();
    return template.content.firstElementChild as HTMLElement | null;
  }
}