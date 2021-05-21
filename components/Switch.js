import Icon from '../components/Icon.js';

export default class Switch{
  constructor({
    ariaLabel,
    checked = false,
    checkedChildren,
    children,
    className,
    isDisabled = false,
    isLoading = false,
    onChange,
    onClick,
    tabIndex,
    unCheckedChildren,
    target,
    title
  }){
    this.$switch = document.createElement(`button`);
    this.$switch.classList.add(`switch`);
    this.$switch.setAttribute(`role`, `switch`);
    this.ariaLabel = ariaLabel;
    this.checked = checked;
    this.checkedChildren = checkedChildren;
    this.children = children;
    this.isDisabled = isDisabled;
    this.className = className;
    this.isLoading = isLoading;
    if(onChange){
      this.$switch.addEventListener(`change`, onChange);
    }
    if(onClick){
      this.$switch.addEventListener(`click`, onClick);
    }
    this.tabIndex = tabIndex;
    this.unCheckedChildren = unCheckedChildren;
    this.title = title;

    target.appendChild(this.$switch);
    this.render();
  }

  render(){
    this.$switch.innerText = null;
    const $checkedSpan = document.createElement(`span`);
    const $unCheckedSpan = document.createElement(`span`);

    if(this.ariaLabel){
      this.$switch.setAttribute(`aria-label`, this.ariaLabel);
    }
    if(this.checkedChildren){
      if(typeof(this.checkedChildren) === `object`){
        $checkedSpan.appendChild(this.checkedChildren);
      }else{
        $checkedSpan.innerText = this.checkedChildren;
      }
    }
    if(this.unCheckedChildren){
      if(typeof(this.unCheckedChildren) === `object`){
        $unCheckedSpan.appendChild(this.unCheckedChildren);
      }else{
        $unCheckedSpan.innerText = this.unCheckedChildren;
      }
    }
    if(this.checked){
      this.$switch.classList.add(`switch-checked`);
      this.$switch.setAttribute(`aria-checked`, this.checked);
      this.$switch.appendChild($checkedSpan);
    }else if(!this.checked){
      this.$switch.classList.remove(`switch-checked`);
      this.$switch.setAttribute(`aria-checked`, this.checked);
      this.$switch.appendChild($unCheckedSpan);
    }
    if(this.children){
      this.$switch.appendChild(this.children);
    }
    if(this.isDisabled){
      this.$switch.disabled = true;
    }else if(!this.isDisabled){
      this.$switch.disabled = false;
    }
    if(this.className){
      this.$switch.classList.add(this.className);
    }
    if(this.isLoading){
      this.$switch.disabled = true;
      this.$switch.innerText = null;
      new Icon({ target: this.$switch, icon: `spinner`, isSpin: true });
    }
    if(!this.isDisabled && !this.isLoading){
      this.$switch.disabled = false;
    }
    if(this.tabIndex){
      this.$switch.tabIndex = this.tabIndex;
    }
    if(this.title){
      this.$switch.title = this.title;
    }
  }
}