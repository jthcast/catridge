import { router } from '../utils/router.js';

export default class Link{
  constructor({
    className,
    href,
    onClick,
    scroll = true,
    text,
    target,
  }){
    this.$link = document.createElement(`a`);
    this.className = className;
    this.href = href;
    this.onClick = onClick;
    this.scroll = scroll;
    this.text = text;

    const onClickHandling = (event) => {
      event.preventDefault();
      const { target } = event;
      const href = target.getAttribute(`href`);

      router(href);
      if(this.onClick){
        this.onClick(event);
      }
      if(this.scroll){
        document.querySelector('.app').scrollTo(0, 0);
      }
    };
    this.$link.addEventListener(`click`, onClickHandling);

    target.appendChild(this.$link);
    this.render();
  }
  
  render(){
    if(this.className){
      this.$link.classList.add(this.className);
    }
    if(this.href){
      this.$link.href = this.href;
    }
    if(this.text){
      this.$link.innerText = this.text;
    }
  }
}