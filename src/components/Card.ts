import { Component } from "../core/Component";

interface CardProps {
    question :string;
    options:string[];
    selectedOption: number | null;
    isLastQuestion: boolean;
}
export class Card extends Component {
    public props: CardProps
        
    constructor (props:CardProps) {
        super()
        this.props = props
    }

//     id
//  ↓
// "What is this element's unique identity?"

// data-option
//  ↓
// "What information does this element carry?"
   render(selectedOption: number | null): string {
  
    this._injectStyle()
     return `
      <article class="quiz-card">
        <h1>Q : ${this.props.question}</h1>
        <div class="quiz-options">

        ${this.props.options
            .map((option,index) => 
            ` <button  class="quiz-option ${
    selectedOption === index
      ? "quiz-option--selected"
      : "quiz-option"
  }" data-option="${index}" >
       <span class="quiz-option__letter">
    ${String.fromCharCode(65 + index)}
  </span>
  <span>${option}</span>
      </button>`).join("")}
        </div>

        <div class="quiz-card__footer">
  <button
  class="quiz-next"
  type="button"
  ${
    selectedOption === null 
        ? "disabled"
        : ""
}
>
 ${this.props.isLastQuestion ? "Finish" : "Next"}
</button>
</div>
      </article>
     `  
   }

    style(): string {
        return `
.quiz-card {
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 21px 41px rgba(61, 68, 173, 0.11);
}

.quiz-card h1 {
  max-width: 580px;
  text-transform:capitalize;
  margin: 0 auto;
  color: #10223e;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -2.6px;
  line-height: 1.02;
  text-align: center;
}

.quiz-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 23px 25px;
  margin-top: 65px;
}

.quiz-option {
  display: flex;
  min-height: 86px;
  align-items: center;
  gap: 15px;
  padding: 14px 25px;
  border: 2px solid #d0cfdd;
  border-radius: 8px;
  background: #fff;
  color: #10223e;
  font: inherit;
  font-size: 19px;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
}

.quiz-option__letter {
  display: grid;
  width: 33px;
  height: 33px;
  flex: 0 0 33px;
  place-items: center;
  border-radius: 50%;
  background: #e5efff;
  color: #4e4eac;
  font-size: 15px;
  font-weight: 800;
}
  .quiz-option:hover {
  border-color: #7775e9;
  transform: translateY(-1px);
}

.quiz-card__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 32px;
  flex-shrink: 0;
}
  .quiz-next {
  width: 184px;
  min-height: 61px;
  border: 0;
  border-bottom: 5px solid #292bb4;
  border-radius: 8px;
  background: #4b49dc;
  color: #fff;
  font: inherit;
  font-size: 23px;
  font-weight: 800;
  cursor: pointer;
}

  .quiz-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quiz-option--selected {
  border-color: #5552e9;
  background: #e5edff;
  
}
  .quiz-option--selected .quiz-option__letter {
  background: #4e4bde;
  color: #fff;
}
        `
    }

   

  

   
}