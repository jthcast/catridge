import debounce from '../utils/debounce.js';

export default class Input{
  constructor({
    autoFocus,
    className,
    icon,
    isDebounce = false,
    isDisabled = false,
    label,
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
    this.isDebounce = isDebounce;
    this.isDisabled = isDisabled;
    this.label = label;
    if(onClick){
      this.$input.addEventListener(`click`, onClick);
    }
    if(onKeyPress){
      const onKeyPressHandler = () => {
        if(isDebounce){
          debounce(onKeyPress, 500);
          return;
        }
        onKeyPress();
      };
      this.$input.addEventListener(`keypress`, onKeyPressHandler);
    }
    if(onEnter){
      const onEnterHandling = (event) => {
        if(event.key === 'Enter'){
          onEnter();
        }
      };
      this.$input.addEventListener(`keypress`, onEnterHandling);
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
      this.label.classList.add(this.className);
    }
    if(this.isDisabled){
      this.$input.disabled = true;
      this.$label.classList.add(`input-label-disabled`);
    }else if(!this.isDisable){
      this.$input.disabled = false;
      this.$label.classList.remove(`input-label-disabled`);
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
}