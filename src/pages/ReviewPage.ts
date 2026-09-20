import { Component } from "../core/Component";
import { Page } from "../core/Page";
import { useState } from "../core/UseState";
import { AppLayout } from "../layout/Applayout";


export class ReviewPage extends Page {
     
    private owner : AppLayout

    constructor(owner:AppLayout) {
        super()
        this.owner = owner;
    }

    render(): string {
        this._injectStyle()
        return `
        <div class="review-page">
        <h1>Review Page</h1>
        <h4>welcome to review page</h4>
        <h4>Score: ${this.owner.score}</h4>
        </div>
        `
    }

    style(): string {
        return `
        .review-page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  border-radius: 12px;
  background: #f5f6ff;
  text-align: center;
}

.review-page h1 {
  margin: 0;
  color: #10223e;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -2px;
}

.review-page h4 {
  margin: 0;
  color: #5f6475;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 500;
}

.review-page h4:last-child {
  margin-top: 20px;
  padding: 20px 40px;
  border-radius: 12px;
  background: #e5edff;
  color: #4b49dc;
  font-size: 32px;
  font-weight: 800;
}
        `
    }
}