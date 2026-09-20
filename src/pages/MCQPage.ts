import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";

import { Component } from "../core/Component";
import { Page } from "../core/Page";
import { useState } from "../core/UseState";

 export class MCQPage extends Page {
    private selectedOption: ReturnType<typeof useState<number | null>>;
    
   
 private questions = [
    {
        question: "what is react",
        options: [
            "A JavaScript library",
            "A database",
            "A programming language",
            "An operating system",
        ],
        correctAnswer: 0,
    },
    {
        question: "What is JavaScript?",
        options: [
            "A programming language",
            "A database",
            "An operating system",
            "A CSS framework",
        ],
        correctAnswer: 0,
    },
];

 private currentQuestion = 1;
    private totalQuestions = this.questions.length;
     private answers: {
    questionIndex: number;
    selectedOption: number | null;
}[] = [];
    private owner : Component
    private getProgress(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
}
    // private progressBar = new ProgressBar({
    //     percent:this.getProgress()
    // })
     private card = new Card({
        question:"what is react",
         options: [
    "A JavaScript library",
    "A database",
    "A programming language",
    "An operating system",
  ],
     })

     constructor(owner: Component) {
    super();

    this.owner = owner
    this.selectedOption = useState<number | null>(null, owner);

    this.card = new Card({
        question: "what is react",
        options: [
            "A JavaScript library",
            "A database",
            "A programming language",
            "An operating system",
        ],
    });
}

    render(): string {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        const question = this.questions[this.currentQuestion - 1];
        return `
        <div class="mcq-page">
        <h1>MCQ page</h1>
        <h3>welcome to mcq page</h3>
        ${new ProgressBar({percent:progress}).render()}

       ${new Card({
    question: question.question,
    options: question.options,
    isLastQuestion: this.currentQuestion === this.totalQuestions,
}).render(this.selectedOption.value)}
        </div>`
    }

    style(): string {
        return `
        .mcq-page:{
        backgroundColour:red;
        }`
    }

    override onPageReady(): void {
      const options = document.querySelectorAll(".quiz-option");

options?.forEach((option) => {
    option.addEventListener("click", () => {
        const index = Number(
            (option as HTMLElement).dataset.option
        );

        this.selectedOption.set(
            this.selectedOption.value === index ?  null : index
        );
    });
});

const nextButton = document.querySelector(".quiz-next");

nextButton?.addEventListener("click", () => {
     if (this.currentQuestion >= this.totalQuestions) {
                this.answers[this.currentQuestion - 1] = {
    questionIndex: this.currentQuestion - 1,
    selectedOption: this.selectedOption.value,
};

const isCorrect =
    this.selectedOption.value === this.questions.correctAnswer;

console.log("Is correct:", isCorrect);
    console.log("Quiz finished");
    console.log("Answers:", this.answers);

        return;
    }

    this.answers[this.currentQuestion - 1] = {
    questionIndex: this.currentQuestion - 1,
    selectedOption: this.selectedOption.value,
};
    this.currentQuestion++

    this.selectedOption.set(null);
});
    }
}