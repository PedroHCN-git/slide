import debounce from "./debounce.js";

export class Slide{
  constructor(slideWrapper, slide){
    this.wrapper = document.querySelector(slideWrapper);
    this.slide = document.querySelector(slide);
    this.distance = {finalPosition: 0, startX: 0, movement: 0};
    this.slideArray;
    this.activeClass = 'active'
  }

  transition(active){
    this.slide.style.transition = active ? 'transform .3s' : ''
  }

  moveSlide(distanceX){
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX){
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event){
    this.transition(false);
    let movetype;
    if (event.type === 'mousedown'){
      event.preventDefault();
      this.distance.startX = event.clientX;
      movetype = 'mousemove'
    } else {
      const touches = event.changedTouches
      this.distance.startX = touches[0].clientX;
      movetype = 'touchmove'
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event){
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    this.moveSlide(this.updatePosition(pointerPosition))
  }

  onEnd(event){
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchstart'
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
    this.transition(true)
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd(){
    if (this.distance.movement > 120 && this.index.next !== undefined){
      this.changeNextSlide();
    } else if (this.distance.movement < -120 && this.index.prev !== undefined) {
      this.changePrevSlide();
    } else {
      this.changeSlide(this.index.current);
    }
  }

  binds(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
    this.changeNextSlide = this.changeNextSlide.bind(this);
    this.changePrevSlide = this.changePrevSlide.bind(this);
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd)
  }

  slidePosition(slide){
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideIndexNav(index){
    const last = this.slideArray.length - 1;

    this.index = {
      prev: index ? index - 1 : undefined,
      current: index,
      next: index != last ? index + 1 : undefined
    };
  }

  changeSlide(index){
    const activeItem = this.slideArray[index]
    this.moveSlide(activeItem.position);
    this.slideIndexNav(index);
    this.distance.finalPosition = activeItem.position;
    this.changeActiveClass();
  }

  slideConfig(){
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element
      }
    });
  }

  changeNextSlide(){
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  changePrevSlide(){
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  changeActiveClass(){
    this.slideArray.forEach(item => {
      item.element.classList.remove(this.activeClass);
    });
    this.slideArray[this.index.current].element.classList.add(this.activeClass);
  }

  onResize(){
    setTimeout(() => {
      this.slideConfig();
      this.changeSlide(this.index.current);
    }, 1000);
  }

  addResizeEvent(){
    window.addEventListener('resize', this.onResize)
  }

  init(){
    this.binds()
    this.transition(true)
    this.addSlideEvents();
    this.slideConfig();
    this.slideIndexNav(0);
    this.changeActiveClass();
    this.addResizeEvent();
    return this
  }
}

export class SlideNav extends Slide{
  addArrow(next, prev){
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.addArrowEvent();
  }

  addArrowEvent(){
    this.next.addEventListener('click', this.changeNextSlide);
    this.prev.addEventListener('click', this.changePrevSlide);
  }
}