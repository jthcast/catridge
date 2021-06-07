import intersectionObserver from '../utils/intersectionObserver.js';

export default class LazyImage{
  constructor({
    alt,
    className,
    emptyImageSrc = `./public/empty-picture.png`,
    height,
    src,
    target,
    width
  }){
    this.$img = document.createElement(`img`);
    this.$img.classList.add(`lazyimage`);
    this.alt = alt;
    this.className = className;
    this.emptyImageSrc = emptyImageSrc;
    if(this.emptyImageSrc){
      const errorHandling = (event) => {
        const target = event.target;
          target.src = this.emptyImageSrc;
      };
      this.$img.addEventListener(`error`, errorHandling);
    }
    this.height = height;
    this.src = src;
    this.width = width;
    
    const callback = (entry, observer) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const dataSrc = element.getAttribute(`data-src`);
        if(dataSrc){
          const src = encodeURI(dataSrc);
          element.setAttribute(`src`, src);
        }
        observer.unobserve(element);
      }
    };
    intersectionObserver(this.$img, callback, {
      root: null, rootMargin: `50%`, threshold: 0
    });
    
    target.appendChild(this.$img);
    this.render();
  }

  get dom(){
    return this.$img;
  }

  render(){
    if(this.alt){
      this.$img.alt = alt;
    }
    if(this.className){
      this.$img.classList.add(this.className);
    }
    if(this.height){
      this.$img.height = this.height;
    }
    if(this.src){
      this.$img.setAttribute(`data-src`, this.src);
    }else{
      this.$img.src = this.emptyImageSrc;
    }
    if(this.width){
      this.$img.width = this.width;
    }
  }
}