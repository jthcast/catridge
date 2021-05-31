import Icon from './../components/Icon.js';

// interface FooterLinks{
//   name: string;
//   href: string;
//   icon: string;
// }

export default class Footer{
  constructor({
    className,
    copyright,
    links,
    target
  }){
    this.$footer = document.createElement(`footer`);
    this.$footer.classList.add(`footer`);
    this.$nav = document.createElement(`nav`);
    this.$nav.classList.add(`footer-links`);
    this.$ul = document.createElement(`ul`);
    this.className = className;
    this.copyright = copyright;
    this.links = links;

    this.$nav.appendChild(this.$ul);
    this.$footer.appendChild(this.$nav);
    target.appendChild(this.$footer);
    this.render();
  }
  
  render(){
    if(this.className){
      this.$footer.classList.add(this.className);
    }
    if(this.copyright){
      const { name, href } = this.copyright;
      const $li = document.createElement(`li`);
      $li.classList.add(`footer-links-copyright`);
      const $a = document.createElement(`a`);
      $a.innerText = `@ ${new Date().getFullYear()} ${name}.`;
      $a.setAttribute(`href`, href);

      $li.appendChild($a);
      this.$ul.appendChild($li);
    }
    if(this.links){
      this.links.forEach((link) => {
        const { name, href, icon } = link;
        const $li = document.createElement(`li`);
        const $a = document.createElement(`a`);
        $a.classList.add(`footer-links-link`);
        $a.setAttribute(`href`, href);
        if(icon){
          new Icon({ target: $a, icon });
        }
        const $span = document.createElement(`span`);
        $span.innerText = name;

        $a.appendChild($span);
        $li.appendChild($a);
        this.$ul.appendChild($li);
      });
    }
  }
}