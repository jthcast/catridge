import { BASE_URL, HOST_URL, router } from '../utils/router.js';
import setState from '../utils/setState.js';
import Button from './Button.js';
import Icon from './Icon.js';
import Link from './Link.js';

export default class Header{
  constructor({
    className,
    links,
    logo,
    target,
    title
  }){
    this.$header = document.createElement(`header`);
    this.$header.classList.add(`header`);
    this.$titleDiv = document.createElement(`div`);
    this.$titleDiv.classList.add(`header-titleDiv`);
    this.$titleDiv.addEventListener(`click`, () => router(`${HOST_URL}${BASE_URL}`));
    this.className = className;
    this.logo = logo;
    this.links = links;
    this.title = title;

    this.$header.appendChild(this.$titleDiv);
    target.appendChild(this.$header);
    this.render();
  }
  
  render(){
    if(this.className){
      this.$header.classList.add(this.className);
    }
    if(this.logo){
      const { alt, src } = this.logo;
      const $img = document.createElement(`img`);
      $img.classList.add(`header-logo`);
      $img.alt = alt;
      $img.src = src;
      
      this.$titleDiv.appendChild($img);
    }
    if(this.title){
      const $span = document.createElement(`span`);
      $span.classList.add(`header-title`);
      $span.innerText = this.title;
      
      this.$titleDiv.appendChild($span);
    }
    if(this.links){
      const $nav = document.createElement(`nav`);
      const $ul = document.createElement(`ul`);
      $nav.classList.add(`header-links`);
      let isOpen = false;
      
      const linksOpenHandling = () => {
        if(isOpen){
          $nav.classList.remove(`header-links-open`);
          setState($icon, { icon: `bars` });
        }else{
          $nav.classList.add(`header-links-open`);
          setState($icon, { icon: `times` });
        }
        isOpen = !isOpen;
      };

      const $icon = new Icon({ target: this.$header, icon: `bars` });
      const $button = new Button({
        target: this.$header,
        className: `header-links-button`,
        onClick: linksOpenHandling,
        title: `menu`,
        icon: `bars`,
        children: $icon.dom
      });
      
      this.links.forEach((link) => {
        const { name, href } = link;
        const $li = document.createElement(`li`);
        const $link = new Link({ href, text: name, target: $li });

        $ul.appendChild($li);
      });

      $nav.appendChild($ul);
      this.$header.appendChild($nav);
    }
  }
}