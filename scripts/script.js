'use strict';

window.onload = function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();


// Маска телефона
    let inputPhone = $('.input-phone');
    inputPhone.inputmask({"mask": "+375(99)-999-99-99"});

    // Маска даты
    $(function () {
        $("#datepicker").datepicker();
    });

    $('.slider-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        cssEase: 'linear',
        dots: true,
        speed: 900,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        cssEase: 'linear',
        dots: true,
        speed: 1100,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

// Переключение услуг
    let haircuts = $('#haircuts'),
        shaving = $('#shaving'),
        complexServices = $('#complex-services'),
        additionalServices = $('#additional-services'),
        table = $('.table'),
        one = $('.table:eq(0)'),
        two = $('.table:eq(1)'),
        three = $('.table:eq(2)'),
        fourth = $('.table:eq(3)');

    haircuts.click(function () {
        table.hide();
        one.show();
        haircuts.addClass('active');
        shaving.removeClass('active');
        complexServices.removeClass('active');
        additionalServices.removeClass('active');
    });

    shaving.click(function () {
        table.hide();
        two.css('display', 'flex');
        shaving.addClass('active');
        haircuts.removeClass('active');
        complexServices.removeClass('active');
        additionalServices.removeClass('active');
    });

    complexServices.click(function () {
        table.hide();
        three.css('display', 'flex');
        complexServices.addClass('active');
        haircuts.removeClass('active');
        shaving.removeClass('active');
        additionalServices.removeClass('active');
    });

    additionalServices.click(function () {
        table.hide();
        fourth.css('display', 'flex');
        additionalServices.addClass('active');
        haircuts.removeClass('active');
        shaving.removeClass('active');
        complexServices.removeClass('active');
    });


    // Popup заказать звонок
    let close = $('.close'),
        window = $('.window'),
        call = $('.call'),
        popupCall = $('.popup-call'),
        orderCall = $('#order-call'),
        input = $('.input'),
        loading = $('.loading'),
        inputName = $('.input-name'),
        success = $('.success'),
        popupInfo = $('.popup-info'),
        errorInput = $('.error-input');

    close.click(function () {
        window.hide();
        popupCall.removeClass('animate__flipInX');
    });

    call.click(function () {
        window.show();
        popupCall.addClass('animate__flipInX');
        input.val('');
        errorInput.hide();
        input.removeClass('input-red');
        popupInfo.show();
        success.css('display', 'none');

    });

    // Закрывать попап по фону
    window.mouseup(function (e) {
        if (!popupCall.is(e.target)
            && popupCall.has(e.target).length === 0) {
            window.hide();
        }
    });


    // Валидация формы

    orderCall.click(function () {

        errorInput.hide();
        let hasError = false;
        input.removeClass('input-red');


        if (!inputName.val()) {
            inputName.next().show();
            hasError = true;
            inputName.addClass('input-red');
        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            hasError = true;
            inputPhone.addClass('input-red');
        }

        // Отправка на сервер
        if (!hasError) {
            loading.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: inputName.val(), phone: inputPhone.val()}
            })
                .done(function (msg) {
                    loading.hide();
                    if (msg.success === 1) {
                        window.hide();
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    } else {
                        popupInfo.hide();
                        success.css('display', 'block');
                    }
                });
        }

    });

// popup Заказ

    let closeOrderPopup = $('.close-order-popup'),
        windowOrder = $('.window-order'),
        recording = $('.recording'),
        orderPopup = $('.order-popup');

    closeOrderPopup.click(function () {
        windowOrder.hide();
        orderPopup.removeClass('animate__flipInX');
    });

    recording.click(function () {
        windowOrder.css('display', 'flex');
        orderPopup.addClass('animate__flipInX');
        input.val('');
        errorInput.hide();
        input.removeClass('input-red');
        $('.popup-order-info').css('display', 'block');
        $('.success-1').css('display', 'none');
    });

    // Закрывать попап по фону
    windowOrder.mouseup(function (e) {
        if (!orderPopup.is(e.target)
            && orderPopup.has(e.target).length === 0) {
            windowOrder.hide();
        }
    });

    // Валидация формы

    let buttonOrder = $('#button-order'),
        inputOrderName = $('.input-order-name'),
        inputOrderPhone = $('.input-order-phone'),
        inputOrderService = $('.input-order-service'),
        inputOrderMaster = $('.input-order-master'),
        inputOrderDate = $('.input-order-date'),
        inputOrderTime = $('.input-order-time');

    // Маска телефона
    inputOrderPhone.inputmask({"mask": "+375(99)-999-99-99"});

    buttonOrder.click(function () {

        errorInput.hide();
        let hasError1 = false;
        input.removeClass('input-red');


        if (!inputOrderName.val()) {
            inputOrderName.next().show();
            hasError1 = true;
            inputOrderName.addClass('input-red');
        }
        if (!inputOrderPhone.val()) {
            inputOrderPhone.next().show();
            hasError1 = true;
            inputOrderPhone.addClass('input-red');
        }
        if (!inputOrderService.val()) {
            inputOrderService.next().show();
            hasError1 = true;
            inputOrderService.addClass('input-red');
        }
        if (!inputOrderMaster.val()) {
            inputOrderMaster.next().show();
            hasError1 = true;
            inputOrderMaster.addClass('input-red');
        }
        if (!inputOrderDate.val()) {
            inputOrderDate.next().show();
            hasError1 = true;
            inputOrderDate.addClass('input-red');
        }
        if (!inputOrderTime.val()) {
            inputOrderTime.next().show();
            hasError1 = true;
            inputOrderTime.addClass('input-red');
        }
        // Отправка на сервер
        if (!hasError1) {
            $('.loading-1').css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {
                    name: inputOrderName.val(),
                    phone: inputOrderPhone.val(),
                    service: inputOrderService.val(),
                    master: inputOrderMaster.val(),
                    date: inputOrderDate.val(),
                    time: inputOrderTime.val()
                }
            })
                .done(function (msg) {
                    $('.loading-1').hide();
                    if (msg.success === 1) {
                        $('.window-order').hide();
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    } else {
                        $('.popup-order-info').hide();
                        $('.success-1').css('display', 'block');
                    }
                });
        }
    });

    // popup Скидки

    let closeDiscount = $('.close-discount'),
        windowDiscount = $('.window-discount'),
        buttonDiscount = $('.button-discount'),
        popupDiscount = $('.popup-discount');

    closeDiscount.click(function () {
        windowDiscount.hide();
        popupDiscount.removeClass('animate__flipInX');
    });

    buttonDiscount.click(function () {
        windowDiscount.show();
        popupDiscount.addClass('animate__flipInX');
    });

    // Закрывать попап по фону
    windowDiscount.mouseup(function (e) {
        if (!popupDiscount.is(e.target)
            && popupDiscount.has(e.target).length === 0) {
            windowDiscount.hide();
        }
    });

// Плавный скролл у ссылок

    let menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let attribute = item.getAttribute("href")
            document.querySelector(attribute).scrollIntoView({behavior: "smooth"});
        })
    });


    // Открытие попапа через ссылки

    document.addEventListener('click', e => {
        if (e.target.nodeName === 'A') {
            e.preventDefault()
        }
    });

// Добавление имени мастера в форму

    let productInput = document.getElementsByClassName('input-order-master')[0];
    let addToCartButtons = document.getElementsByClassName('barber-title');

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].onclick = function (e) {
            productInput.value = e.target.parentElement.previousElementSibling.innerText;
        }
    }

    // Меню

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })

}

