const icons = {
  search: {
    viewBox: `0 0 512 512`,
    paths: [
      {
        d: `M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z`
      }
    ]
  },
  spinner: {
    viewBox: `0 0 1024 1024`,
    paths: [
      {
        d: `M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z`
      }
    ]
  },
};

const getRotateDegree = (viewBox) => {
  const viewBoxArray = viewBox.split(` `);

  return `${+viewBoxArray[2] / 2} ${+viewBoxArray[3] / 2}`;
};

export default class Icon{
  constructor({
    className,
    isFocusable = false,
    icon,
    isSpin = false,
    onClick,
    rotate,
    target
  }){
    this.svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    this.svg.classList.add(`icon`);
    this.svg.setAttribute(`width`, `1em`);
    this.svg.setAttribute(`height`, `1em`);
    this.svg.setAttribute(`fill`, `currentColor`);
    this.svg.setAttribute(`focusable`, isFocusable);
    this.className = className;
    this.isFocusable = isFocusable;
    this.icon = icon;
    this.isSpin = isSpin;
    this.onClick = onClick;
    this.rotate = rotate;

    target.appendChild(this.svg);
    this.render();
  }
  
  render(){
    if(this.className){
      this.svg.classList.add(this.className);
    }
    if(this.icon){
      const iconData = icons[this.icon];
      const { viewBox, paths } = iconData;

      this.svg.setAttribute(`viewBox`, viewBox);
      paths.forEach((pathData) => {
        const path = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
        const { fill, d } = pathData;

        if(fill){
          path.setAttribute(`fill`, fill);
        }
        if(d){
          path.setAttribute(`d`, d);
        }
        if(this.rotate){
          path.setAttribute(`transform`, `rotate(${this.rotate} ${getRotateDegree(viewBox)})`)
        }
        this.svg.appendChild(path);
      });
    }
    if(this.isSpin){
      this.svg.classList.add(`icon-spin`);
    }
    if(this.onClick){
      this.svg.addEventListener(`click`, this.onClick);
    }
  }
}