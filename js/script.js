$('.mobile__menu').on('click', function (e) {
    e.preventDefault()
    $('.menu__btn').toggleClass('menu__active')
    $('.navigation').toggleClass('menu__active')
    $('body').toggleClass('menu__active')

})