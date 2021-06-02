import Button from './Button.js';
import { router } from '../utils/router.js';

export default class ErrorSection{
  constructor({
    children,
    message,
    statusCode,
    target
  }){
    this.$section = document.createElement(`section`);
    this.$section.classList.add(`errorsection`);
    this.$h1 = document.createElement(`h1`);
    this.$h1.innerText = `오류가 발생했습니다. 💥`;
    this.children = children;
    this.message = message;
    this.statusCode = statusCode;

    this.$section.appendChild(this.$h1);
    target.appendChild(this.$section);
    this.render();
  }
  
  render(){
    if(this.statusCode){
      const $p = document.createElement(`p`);
      $p.innerText = `${this.statusCode}`;

      this.$section.appendChild($p);
    }
    if(this.message){
      const $p = document.createElement(`p`);
      $p.innerText = `${this.message}`;

      this.$section.appendChild($p);
    }
    if(this.children){
      this.$section.appendChild(this.children);
    }

    const $button = new Button({
      ariaLabel: `홈`,
      design: `primary`,
      target: this.$section,
      title: `홈`,
      onClick: () => router(`/`)
    });
  }
}