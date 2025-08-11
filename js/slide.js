export default class Slide{
  constructor(slideWrapper, slide){
    this.wrapper = document.querySelector(slideWrapper);
    this.slide = document.querySelector(slide);
    this.distance = {finalPosition: 0, startX: 0, movement: 0}
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
  }

  binds(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd)
  }

  init(){
    this.binds()
    this.addSlideEvents();
    return this
  }
}