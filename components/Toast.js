export default class Toast{
  constructor({
    bodyChildren,
    className,
    duration,
    headerChildren,
    isClickToDestroy = true,
    onClick,
    position = `topRight`,
    showDurationBar = true,
  }){
    this.$toast = document.createElement(`div`);
    this.$toast.classList.add(`toast`);
    this.$toast.setAttribute(`role`, `alert`);
    const $wrapper = document.querySelector(`.toast-wrapper-${position}`);
    if($wrapper){
      $wrapper.appendChild(this.$toast);
    }else{
      const $wrapperDiv = document.createElement(`div`);
      $wrapperDiv.classList.add(`toast-wrapper-${position}`);
      $wrapperDiv.appendChild(this.$toast);
      document.body.appendChild($wrapperDiv);
    }
    this.bodyChildren = bodyChildren;
    this.className = className;
    this.duration = duration;
    this.headerChildren = headerChildren;
    this.isClickToDestroy = isClickToDestroy;
    this.onClick = onClick;
    this.showDurationBar = showDurationBar;
    this.timer = undefined;

    const onClickHandling = () => {
      if(this.isClickToDestroy){
        clearInterval(this.timer);
        this.destroy();
      }
      if(this.onClick){
        this.onClick();
      }
    };
    this.$toast.addEventListener(`click`, onClickHandling);
    
    this.render();
  }
  
  render(){
    this.$toast.innerText = null;

    if(this.headerChildren){
      const $header = document.createElement(`div`);
      $header.classList.add(`toast-header`);
      if(typeof(this.headerChildren) === `object`){
        $header.appendChild(this.headerChildren);
      }else{
        const $span = document.createElement(`span`);
        $span.innerText = this.headerChildren;
        $header.appendChild($span);
      }
      this.$toast.appendChild($header);
    }
    if(this.bodyChildren){
      const $body = document.createElement(`div`);
      $body.classList.add(`toast-body`);
      if(typeof(this.bodyChildren) === `object`){
        $body.appendChild(this.bodyChildren);
      }else{
        const $span = document.createElement(`span`);
        $span.innerText = this.bodyChildren;
        $body.appendChild($span);
      }
      this.$toast.appendChild($body);
    }
    if(this.className){
      this.$toast.classList.add(this.className);
    }
    if(this.duration){
      setTimeout(() => {
        this.$toast.classList.add(`toast-disappear`)
      }, this.duration);
      setTimeout(() => {
        this.destroy();
      }, this.duration + 400);
    }
    if(this.duration && this.showDurationBar){
      const $bar = document.createElement(`div`);
      $bar.classList.add(`toast-durationbar`);
      this.$toast.appendChild($bar);
      let delay = 50;
      let counter = this.duration;
      this.timer = setInterval(() => {
        $bar.style.width = `${(counter / this.duration) * 100}%`;
        counter -= delay;
      }, delay);
    }
  }

  destroy(){
    clearInterval(this.timer);
    this.$toast.remove();
  }
}