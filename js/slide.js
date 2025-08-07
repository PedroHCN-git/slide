export default class Slide{
  constructor(slideWrapper, slide){
    debugger
    this.wrapper = document.querySelector(slideWrapper);
    this.slide = document.querySelector(slide);
  }

  onStart(event){
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event){
   
  }

  onEnd(){
    this.wrapper.removeEventListener('mousemove', this.onMove);
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