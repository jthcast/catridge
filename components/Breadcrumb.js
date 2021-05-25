import getUUID from '../utils/uuid.js';

// interface Route {
//   path: string;
//   breadcrumbName: string;
// }

export default class Breadcrumb{
  constructor({
    routes,
    separator = `/`,
    onClick,
    target,
  }){
    this.$nav = document.createElement(`nav`);
    this.$nav.classList.add(`breadcrumb`);
    this.$ol = document.createElement(`ol`);
    this.uuid = getUUID({ type: `string` });
    this.$ol.classList.add(`breadcrumb-list`, `css-${this.uuid}`);
    this.routes = routes;
    this.separator = separator;
    this.onClick = onClick;
    if(this.onClick){
      this.$nav.addEventListener(`click`, this.onClick);
    }
    
    this.$nav.appendChild(this.$ol);
    target.appendChild(this.$nav);
    this.render();
  }
  
  render(){
    this.$ol.innerText = null;

    if(this.routes){
      this.routes.forEach((route, index) => {
        const { path, breadcrumbName } = route;
        const $li = document.createElement(`li`);
        const $span = document.createElement(`span`);
        $span.innerText = breadcrumbName;
        $span.setAttribute(`data-href`, path);
        if(index === this.routes.length - 1){
          $span.classList.add(`breadcrumb-item-last`);
        }else{
          $span.classList.add(`breadcrumb-item`);
        }

        $li.appendChild($span);
        this.$ol.appendChild($li);
      });
    }
    if(this.separator){
      const $after = document.createElement(`style`);
      $after.innerHTML = `.css-${this.uuid} li:after { 
        content: '${this.separator}';
        padding: 0 0.5rem;
      }`;

      this.$nav.appendChild($after);
    }
  }
}