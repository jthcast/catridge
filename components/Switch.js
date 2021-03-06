import Icon from '../components/Icon.js';

export default class Switch{
  constructor({
    ariaLabel,
    isChecked = false,
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
    this.isChecked = isChecked;
    this.checkedChildren = checkedChildren;
    this.children = children;
    this.isDisabled = isDisabled;
    this.className = className;
    this.isLoading = isLoading;
    this.onChange = onChange;
    this.onClick = onClick;
    if(this.onChange){
      this.$switch.addEventListener(`change`, this.onChange);
    }
    if(this.onClick){
      this.$switch.addEventListener(`click`, this.onClick);
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
    if(this.isChecked){
      this.$switch.classList.add(`switch-checked`);
      this.$switch.setAttribute(`aria-checked`, this.isChecked);
      this.$switch.appendChild($checkedSpan);
    }else if(!this.isChecked){
      this.$switch.classList.remove(`switch-checked`);
      this.$switch.setAttribute(`aria-checked`, this.isChecked);
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