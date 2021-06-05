import debounce from '../utils/debounce.js';
import Icon from './Icon.js';

export default class Input{
  constructor({
    autoFocus,
    className,
    icon,
    isDebounce = false,
    isDisabled = false,
    isLoading = false,
    label = ``,
    onClick,
    onKeyPress,
    onEnter,
    placeholder,
    target,
    type = `text`,
    value
  }){
    this.$label = document.createElement(`label`);
    this.$label.classList.add(`input-label`);
    this.$span = document.createElement(`span`);
    this.$span.classList.add(`input-span`);
    this.$span.innerText = label;
    this.$input = document.createElement(`input`);
    this.$input.classList.add(`input`);
    this.autoFocus = autoFocus;
    this.className = className;
    this.icon = icon;
    this.iconElement = undefined;
    this.isDebounce = isDebounce;
    this.isDisabled = isDisabled;
    this.isLoading = isLoading;
    this.label = label;
    if(this.label){
      this.$input.classList.add(`input-label-text`);
    }
    this.onClick = onClick;
    this.onEnter = onEnter;
    this.onKeyPress = onKeyPress;
    if(this.onClick){
      this.$input.addEventListener(`click`, this.onClick);
    }
    if(this.onEnter){
      const onEnterHandling = (event) => {
        if(event.key === `Enter`){
          onEnter();
        }
      };
      this.$input.addEventListener(`keypress`, onEnterHandling);
    }
    if(this.onKeyPress){
      const onKeyPressHandler = () => {
        if(this.isDebounce){
          debounce(this.onKeyPress, 500);
          return;
        }
        onKeyPress();
      };
      this.$input.addEventListener(`keypress`, onKeyPressHandler);
    }
    this.placeholder = placeholder;
    this.target = target;
    this.type = type;
    this.value = value;
    
    this.$label.appendChild(this.$span);
    this.$label.appendChild(this.$input);
    target.appendChild(this.$label);
    this.render();
  }
  
  render(){
    if(this.autoFocus){
      this.$input.autofocus = true;
    }
    if(this.className){
      this.$label.classList.add(this.className);
    }
    if(this.icon){
      this.iconElement?.remove();
      this.$input.classList.add(`input-label-text-icon`);
      const icon = new Icon({ className: `input-icon`, icon: this.icon, target: this.$label });
      this.iconElement = icon.dom;
    }
    if(this.isDisabled){
      this.$input.disabled = true;
      this.$label.classList.add(`input-label-disabled`);
    }else if(!this.isDisable){
      this.$input.disabled = false;
      this.$label.classList.remove(`input-label-disabled`);
    }
    if(this.isLoading){
      this.iconElement?.remove();
      this.$input.classList.add(`input-label-text-icon`);
      const icon = new Icon({
        className: `input-icon`,
        icon: `spinner`,
        isSpin: true,
        target: this.$label
      });
      this.iconElement = icon.dom;
    }else{
      if(!this.icon){
        this.iconElement?.remove();
        this.$input.classList.remove(`input-label-text-icon`);
      }
    }
    if(this.placeholder){
      this.$input.placeholder = this.placeholder;
    }
    if(this.type){
      this.$input.type = this.type;
    }
    if(this.value){
      this.$input.value = this.value;
    }
  }

  clear(){
    this.$input.value = ``;
  }
}