import LazyImage from './LazyImage.js';

export default class Card{
  constructor({
    className,
    description,
    imageURL,
    onClick,
    target,
    title,
  }){
    this.$card = document.createElement(`div`);
    this.$card.classList.add(`card`);
    this.className = className;
    this.description = description;
    this.imageURL = imageURL;
    this.onClick = onClick;
    if(this.onClick){
      this.$card.addEventListener(`click`, this.onClick);
    }
    this.title = title;

    target.appendChild(this.$card);
    this.render();
  }

  render(){
    if(this.className){
      this.$card.classList.add(this.className);
    }
    if(this.imageURL){
      new LazyImage({
        target: this.$card,
        src: this.imageURL,
        className: `card-image`
      });
    }
    if(this.title || this.description){
      const $cardBody = document.createElement(`div`);
      $cardBody.classList.add(`card-body`);
      this.$card.appendChild($cardBody);

      if(this.title){
        const $span = document.createElement(`span`);
        $span.classList.add(`card-title`);
        $span.innerText = this.title;
        $cardBody.appendChild($span);
      }
      if(this.description){
        const $span = document.createElement(`span`);
        $span.classList.add(`card-description`);
        $span.innerText = this.description;
        $cardBody.appendChild($span);
      }
    }
  }
}