$(document).ready(function(){
    // 메인 비주얼 스와이퍼
    const progressCircle = document.querySelector(".autoplay-progress svg"); /* 선표시 */
    //const progressContent = document.querySelector(".autoplay-progress span"); /* 초단위 표시 */
    var swiper = new Swiper(".main_swiper_big_box", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 11000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress); /* 선표시 */
                //progressContent.textContent = `${Math.ceil(time / 1000)}s`; /* 초단위 표시 */
            }
        }
    });

    //메인 공지사항 스와이퍼
    var notice_swiper = new Swiper(".notice_list_wrap", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });
});



$(window).on('load', function () {
    AOS.refresh();
});

$(function () {


    // 메인 헤더 스크롤
    $(window).on("scroll", scrollHandler);

    function scrollHandler() {
        let to = $(window).scrollTop();
        fixed(to);
    }

    function fixed(to) {
        (to > 50) ? $("#header").addClass("fixed") : $("#header").removeClass("fixed"),
            (to > 50) ? $("#wrap").addClass("move") : $("#wrap").removeClass("move")
        return;
    }

    AOS.init({
        duration: 1200
    });


});