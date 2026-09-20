import { Page } from "../core/Page";
import { useState } from "../core/UseState";


export class ReviewPage extends Page {
     
    private answers: {
    questionIndex: number;
    selectedOption: number | null;
}[] = [];

    constructor(answers:(number | null)) {
        super()
        this.answers = answers;
    }

    render(): string {
        return `
        <div class="review-page">
        <h1>Review Page</h1>
        <h4>welcome to review page</h4>
        </div>
        `
    }

    style(): string {
        return `
        .review-page:{
        backegroundColour:green;
        }
        `
    }
}