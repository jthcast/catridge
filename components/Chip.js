import Icon from '../components/Icon.js';

export default class Chip{
  constructor({
    allowClose = false,
    className,
    onClose,
    target,
    title
  }){
    this.$chip = document.createElement(`span`);
    this.$chip.classList.add(`chip`);
    this.$closeButton = document.createElement(`button`);
    this.$closeButton.classList.add(`chip-closebutton`);
    const closeIcon = new Icon({ target: this.$closeButton, icon: `times` });
    this.allowClose = allowClose;
    this.className = className;
    this.onClose = onClose;
    this.title = title;
    
    const onClickHandling = (event) => {
      if (this.onClose) {
        this.onClose(event);
      }
      this.$chip.remove();
    };
    this.$closeButton.addEventListener(`click`, onClickHandling);

    target.appendChild(this.$chip);
    this.render();
  }
  
  render(){
    if(this.className){
      this.$chip.classList.add(this.className);
    }
    if(this.title){
      this.$chip.innerText = this.title;
    }
    if(this.allowClose){
      this.$chip.appendChild(this.$closeButton);
    }
  }
}