import Icon from '../components/Icon.js';

export default class Button{
  constructor({
    ariaLabel,
    children,
    className,
    design,
    formAction,
    formTarget,
    isDisable = false,
    isLoading = false,
    onClick,
    tabIndex,
    target,
    title,
    type = `button`
  }){
    this.$button = document.createElement(`button`);
    this.$button.classList.add(`button`);
    this.ariaLabel = ariaLabel;
    this.children = children;
    this.className = className;
    this.design = design;
    this.formAction = formAction;
    this.formTarget = formTarget;
    this.isDisable = isDisable;
    this.isLoading = isLoading;
    if(onClick){
      this.$button.addEventListener(`click`, onClick);
    }
    this.tabIndex = tabIndex;
    this.title = title;
    this.type = type;
    
    target.appendChild(this.$button);
    this.render();
  }
  
  render(){
    this.$button.innerText = null;

    if(this.ariaLabel){
      this.$button.setAttribute(`aria-label`, this.ariaLabel);
    }
    if(this.children){
      this.$button.appendChild(this.children);
    }
    if(this.className){
      this.$button.classList.add(this.className);
    }
    if(this.design){
      if(this.design === `primary`){
        this.$button.classList.add(`button-primary`);
      }else if(this.design === `danger`){
        this.$button.classList.add(`button-danger`);
      }
    }
    if(this.type === `submit` && this.formAction){
      this.$button.formAction = this.formAction;
    }
    if(this.formTarget){
      this.$button.formTarget = this.formTarget;
    }
    if(this.isDisable){
      this.$button.disabled = true;
    }else if(!this.isDisable){
      this.$button.disabled = false;
    }
    if(this.isLoading){
      this.$button.disabled = true;
      new Icon({ target: this.$button, icon: `spinner`, isSpin: true, className: `button-icon` });
    }
    if(!this.isDisable && !this.isLoading){
      this.$button.disabled = false;
    }
    if(this.tabIndex){
      this.$button.tabIndex = this.tabIndex;
    }
    if(this.title){
      this.$button.title = this.title;
      const text = document.createElement(`span`);
      text.innerText = this.title;
      this.$button.appendChild(text);
    }
    if(this.type){
      this.$button.type = this.type;
    }
  }
}