import { Page } from "../core/Page";
import { useState } from "../core/UseState";
import { HomePage } from "../pages/HomePage";
import { MCQPage } from "../pages/MCQPage";
import { NotFound } from "../pages/NotFound";
import { ReviewPage } from "../pages/ReviewPage";


// AppLayout object → blueprint
//        ↓
//  _element         → actual house
//        ↓
//  root             → land/container

type RouteType =
  | "HomePage"
  | "MCQPage"
  | "ReviewPage"
  | "NotFound";

export class AppLayout extends Page {
  private route = useState<RouteType>("HomePage", this);

  private pages: Page[] = [
    new HomePage(),
    new MCQPage(this),
    new ReviewPage(),
    new NotFound(),
  ];

  render(): string {
    const currentRoute = this.route.value;

    console.log("Rendering route:", currentRoute);

    for (const page of this.pages) {
      const pageName = page.constructor.name as RouteType;

      if (currentRoute === pageName) {
        return page.render();
      }
    }

    return this.pages[this.pages.length - 1].render();
  }

  style(): string {
    return "";
  }

  //when onPageReady() runs, _element already exists and has been inserted.
  //route → decides WHAT page gets rendered
//onPageReady() → tells a Page "your setup phase is happening"

override onPageReady(): void {
  // console.log("AppLayout mounted:", this._element);
  this.pages.forEach((page) => {
    page.onPageReady();
  });

  const appLayoutElement = this._element;

  appLayoutElement?.addEventListener("route", (event) => {
    console.log("🔥 APP LAYOUT RECEIVED ROUTE EVENT");

    const customEvent = event as CustomEvent;
    const routeName = customEvent.detail.routeName;

    console.log("routeName:", routeName);

    this.route.set(routeName);
  });
}

override onUnmount(): void {
  console.log("AppLayout unmounted");
}
}

