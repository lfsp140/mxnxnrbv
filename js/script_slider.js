function go_back(list_slides, list_indicators) {
    let active_slide = find_active_slide(list_slides);
    let num_new_slide;
    if (active_slide == 0) {
        num_new_slide = list_slides.length - 1;
    }
    else {
        num_new_slide = active_slide - 1;
    }
    update_slide(list_slides, list_indicators, num_new_slide);
}

function go_forward(list_slides, list_indicators) {
    let active_slide = find_active_slide(list_slides);
    let num_new_slide;
    if (active_slide == list_slides.length-1) {
        num_new_slide = 0;
    }
    else {
        num_new_slide = active_slide + 1;
    }
    update_slide(list_slides, list_indicators, num_new_slide);
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
    list_slides[new_slide].classList.add('slider__slide_active');
    if (list_indicators[active_slide].className.includes('slider__indicator-light')) {
        list_indicators[active_slide].classList.remove('slider__indicator-light_active');
        list_indicators[new_slide].classList.add('slider__indicator-light_active');
    }
    else {
        list_indicators[active_slide].classList.remove('slider__indicator_active');
        list_indicators[new_slide].classList.add('slider__indicator_active');
    }
}

function autoSlide() {
    slideInterval = setInterval(() => go_forward(slides, indicators), 3000);
}

function stopAuto() {
    clearInterval(slideInterval);
}



function control_hints() {
    block_hints = document.getElementsByClassName('search__hints')[0];
    input_search = document.getElementsByClassName('search__input')[0];
    let input_value = search_input.value.toLowerCase();
    let st;
    let hints_html = '';
    genres.forEach(function(element) {
        if (element.includes(input_value)) {
            st = '<p class="search__hint">' + element + '</p>';
            hints_html = hints_html + st;
        }
    });
    if (hints_html === '') {
        if (block_hints.className.includes('search__hints-light')) {
            block_hints.style.backgroundColor = '#d8d8d8';
        }
        else {
            block_hints.style.backgroundColor = '#1b1b1b';
        }
        
    }
    else {
        if (block_hints.className.includes('search__hints-light')) {
            block_hints.style.backgroundColor = '#afafaf';
        }
        else {
            block_hints.style.backgroundColor = '#3d3d3d';
        }
        
    }
    document.getElementsByClassName('search__hints')[0].innerHTML = hints_html;
    
    list_hints = document.getElementsByClassName('search__hint');
    
    for (let i = 0; i < list_hints.length; i++) {
        list_hints[i].addEventListener('click', () => {
            input_search.value = list_hints[i].innerHTML;
            stopCheckHints();
        });
    };
}

function check_active_elem(block_h) {
    let search_input = document.getElementsByClassName('search__input')[0];
    if (search_input !== document.activeElement) {
        stopCheckHints();
        block_h.classList.remove('search__hints_active');
    }
}

function autoCheck() {
    checkInterval = setInterval(() => check_active_elem(block_hints), 500);
}

function stopCheck() {
    clearInterval(checkInterval);
}

function autoCheckHints() {
    hintsInterval = setInterval(() => control_hints(), 300);
}

function stopCheckHints() {
    clearInterval(hintsInterval);
}


let slides = document.getElementsByClassName('slider__slide');
let indicators = document.getElementsByClassName('slider__indicator');
let buttons = document.getElementsByClassName('slider__button');
let button_back = document.getElementsByClassName('slider__button')[0];
let button_forward = document.getElementsByClassName('slider__button')[1];
let slider = document.getElementsByClassName('slider__content')[0];
let slideInterval;
let checkInterval;
let hintsInterval;

let search_input = document.getElementsByClassName('search__input')[0];
let genres = ['шутер', 'приключения', 'симулятор', 'ролевая игра', 'гонки', 'стратегия', 'королевская арена', 'песочница'];
let list_hints = document.getElementsByClassName('search__hint');
let block_hints = document.getElementsByClassName('search__hints')[0];

slider.addEventListener('mouseenter', stopAuto);
slider.addEventListener('mouseleave', autoSlide);

button_back.addEventListener('click', () => {
    stopAuto();
    go_back(slides, indicators);
});
button_forward.addEventListener('click', () => {
    stopAuto();
    go_forward(slides, indicators);
});

search_input.addEventListener('keydown', () => control_hints());
search_input.addEventListener('click', () => {
    block_hints.classList.add('search__hints_active');
    autoCheckHints();
});

choice_indicator(slides, indicators);
autoSlide();
autoCheck();
autoCheckHints();