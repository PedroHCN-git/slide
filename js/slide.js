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
    console.log(this.distance.finalPosition - this.distance.movement);
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event){
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event){
    this.moveSlide(this.updatePosition(event.clientX))
  }

  onEnd(){
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  binds(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  init(){
    this.binds()
    this.addSlideEvents();
    return this
  }
}