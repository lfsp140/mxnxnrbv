function go_back(list_slides, list_indicators) {
    let active_slide = find_active_slide(list_slides);
    list_slides[active_slide].classList.remove('slider__slide_active');
    list_indicators[active_slide].classList.remove('slider__indicator_active');
    let num_new_slide;
    if (active_slide == 0) {
        num_new_slide = list_slides.length - 1;
    }
    else {
        num_new_slide = active_slide - 1;
    }
    list_slides[num_new_slide].classList.add('slider__slide_active');
    list_indicators[num_new_slide].classList.add('slider__indicator_active');
}

function go_forward(list_slides, list_indicators) {
    let active_slide = find_active_slide(list_slides);
    list_slides[active_slide].classList.remove('slider__slide_active');
    list_indicators[active_slide].classList.remove('slider__indicator_active');
    if (active_slide == list_slides.length-1) {
        active_slide = 0;
    }
    else {
        active_slide = active_slide + 1;
    }
    list_slides[active_slide].classList.add('slider__slide_active');
    list_indicators[active_slide].classList.add('slider__indicator_active');
}

function find_active_slide(list_slides) {
    let num_active_slide;
    for (let i = 0; i < list_slides.length; i++) {
        if (list_slides[i].className.includes('slider__slide_active')) {
            num_active_slide = i;
        }
    }
    return num_active_slide;
}

function choice_indicator(list_slides, list_indicators) {
    for (let i = 0; i < list_indicators.length; i++) {
        list_indicators[i].addEventListener('click', () => {
            update_slide(list_slides, list_indicators, i);
            stopAuto();
            autoSlide();
        });
    }
}

function update_slide(list_slides, list_indicators, new_slide) {
    let active_slide = find_active_slide(list_slides);
    list_slides[active_slide].classList.remove('slider__slide_active');
    list_indicators[active_slide].classList.remove('slider__indicator_active');
    list_slides[new_slide].classList.add('slider__slide_active');
    list_indicators[new_slide].classList.add('slider__indicator_active');
    console.log(slideInterval);
}

function autoSlide() {
    slideInterval = setInterval(() => go_forward(slides, indicators), 3000);
}

function stopAuto() {
    clearInterval(slideInterval);
}

let slides = document.getElementsByClassName('slider__slide');
let indicators = document.getElementsByClassName('slider__indicator');
let buttons = document.getElementsByClassName('slider__button');
let button_back = document.getElementsByClassName('slider__button')[0];
let button_forward = document.getElementsByClassName('slider__button')[1];
let slider = document.getElementsByClassName('slider__content')[0];
let slideInterval;

slider.addEventListener('mouseenter', stopAuto);
slider.addEventListener('mouseleave', autoSlide);

button_back.addEventListener('click', () => {
    stopAuto();
    go_back(slides, indicators);
    autoSlide();
});
button_forward.addEventListener('click', () => {
    go_forward(slides, indicators);
    stopAuto();
    autoSlide();
});

choice_indicator(slides, indicators);
autoSlide();