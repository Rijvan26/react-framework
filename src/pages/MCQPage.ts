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


private calculateScore(): number {
    let score = 0;

    for (const answer of this.answers) {
        const question = this.questions[answer.questionIndex];

        if (answer.selectedOption === question.correctAnswer) {
            score++;
        }
    }
console.log(score)

    return score;
}


    render(): string {
        this._injectStyle()
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
     html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.mcq-page {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 22px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  background: #f5f6ff;
}

.mcq-page h1 {
  margin: 0;
  color: #10223e;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 32px;
  font-weight: 800;
}

.mcq-page h3 {
  margin: 0 0 8px;
  color: #5f6475;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 18px;
  font-weight: 500;
}

.mcq-page .progress-parent {
  flex-shrink: 0;
}

.mcq-page .quiz-card {
  flex: 1;
  min-height: 0;
}
  
`
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

    const score = this.calculateScore();

this.owner.emit("quizFinished", {
    score,
});

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