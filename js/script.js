function controlMenu() {
    let header_menu = document.getElementsByClassName('header__menu');
    if (header_menu[0].className.includes('header__menu_active')) {
        header_menu[0].classList.remove('header__menu_active');
    }
    else {
        header_menu[0].classList.add('header__menu_active');
    }
}

function controlFilter() {
    let catalog_filter = document.getElementsByClassName('catalog__form');
    if (catalog_filter[0].className.includes('catalog__form_active')) {
        catalog_filter[0].classList.remove('catalog__form_active');
    }
    else {
        catalog_filter[0].classList.add('catalog__form_active');
    }
}

let menu_icon = document.getElementsByClassName('header__button-menu');
menu_icon[0].addEventListener('click', () => controlMenu());

let filter_icon = document.getElementsByClassName('catalog__image-down');
filter_icon[0].addEventListener('click', () => controlFilter());






