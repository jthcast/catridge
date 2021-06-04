export default class Modal{
  constructor({
    children,
    escClose = true,
    isOpen = false,
    onClose,
    openHandler,
    target
  }){
    this.$modalWrapper = document.createElement(`div`);
    this.$modalWrapper.classList.add(`modal`);
    this.$modalWrapper.setAttribute(`role`, `dialog`);
    this.$modalWrapper.setAttribute(`aria-modal`, `true`);
    this.$modal = document.createElement(`div`);
    this.$modal.classList.add(`modal-inner`);
    this.$background = document.createElement(`div`);
    this.$background.classList.add(`modal-backdrop`);
    this.$background.setAttribute(`role`, `presentation`);
    this.children = children;
    this.escClose = escClose;
    this.isOpen = isOpen;
    this.onClose = onClose;
    this.openHandler = openHandler;

    const openHandling = () => {
      if (this.openHandler) {
        this.openHandler();
      }
      if (this.isOpen === false && this.onClose) {
        this.onClose();
      }
    };

    const keyDownHandling = (event) => {
      if (event.code === `Escape` && this.escClose && this.isOpen) {
        openHandling();
      }
    };

    window.addEventListener(`keydown`, keyDownHandling);
    this.$background.addEventListener(`click`, openHandling);
    
    this.$modalWrapper.appendChild(this.$modal);
    this.$modalWrapper.appendChild(this.$background);
    target.appendChild(this.$modalWrapper);
    this.render();
  }
  
  render(){
    if(this.isOpen){
      document.body.style.setProperty(`overflow-y`, `hidden`);
      this.$modalWrapper.classList.add(`modal-open`);
    }else{
      document.body.style.removeProperty(`overflow-y`);
      this.$modalWrapper.classList.remove(`modal-open`);
    }
    if(this.children){
      this.$modal.innerText = null;
      this.$modal.appendChild(this.children);
    }
    if(this.isInit && this.isOpen === false && this.onClose){
      this.onClose();
    }
  }

  destroy(){
    this.$modalWrapper.remove();
  }
}