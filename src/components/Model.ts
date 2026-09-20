import { Component } from "../core/Component";

interface BoxProps {
   text:string;
}

export class Box extends Component {
       public props: BoxProps;

       constructor(props: BoxProps) {
              super();
              this.props = props;
       }

       render(): string {
        return `
        <div class="box">
          ${this.props.text}
        </div>
      `;
       }

       style():string {
        return `
        .box {
          padding: 20px;  
          background-color: lightgray;
          width: 200px;`
       }

}