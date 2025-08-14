import {SlideNav} from "./slide.js";

const slide = new SlideNav('.slide-wrapper', '.slide');
slide.init();
slide.addArrow('.next', '.prev')
slide.addControl('.custom-nav');