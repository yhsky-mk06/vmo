$(function () {

    // 메인 헤더 스크롤
    $(window).on("scroll", scrollHandler);

    function scrollHandler() {
        let to = $(window).scrollTop();
        //fixed(to);
        right_top_button(to);
    }

    //top 버튼
    function right_top_button(to) {
        (to > 550) ? $(".right-top").addClass("on") : $(".right-top").removeClass("on");
        return;
    }
    $(".right-top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 });
    });

    //aos js
    AOS.init({
        duration: 1200
    });
});

/* 헤더와 gnb */
$(function () {
    $(".header .gnb_box").mouseenter(function () {
        $(".header").addClass("active");

        if ($(".header").hasClass("active")) {
            $(".header").removeClass("transparent");
        }
    });
    $(".header").mouseleave(function () {
        $(".header").removeClass("active");
    });

    var didScroll;
    var lastScrollTop = 0;
    var navbarHeight = $(".header").outerHeight();

    console.log(navbarHeight)

    $(window).scroll(function (event) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);



    function hasScrolled() {
        var st = $(this).scrollTop();

        console.log("위치값", st);


        if (st > lastScrollTop && st > navbarHeight) {
            console.log(st > lastScrollTop && st > navbarHeight)
            // Scroll Down
            if (!$(".header").hasClass("transparent")) {
                $(".header").addClass("up");
                $(".header").removeClass("header_bg")
            }
        } else {
            if (st + $(window).height() < $(document).height()) {
                $(".header").removeClass("up").removeClass("transparent");
                //$(".top_menu").removeClass("on");
                $(".top_menu").slideUp();
                $(".header").addClass("header_bg");
            }
            if (st <= 5) {
                if ($(".header").hasClass("header_main")) {
                    if (!$(".header").hasClass("active")) {
                        $(".header").addClass("transparent");
                        //$(".top_menu").addClass("on");
                        $(".top_menu").slideDown();
                        $(".header").removeClass("header_bg");
                    }
                }
            }
        }

        lastScrollTop = st;
    }
});


$(document).ready(function(){
    // 메인 비주얼 스와이퍼
    const progressCircle = document.querySelector(".autoplay-progress svg"); /* 선표시 */
    //const progressContent = document.querySelector(".autoplay-progress span"); /* 초단위 표시 */
    var swiper = new Swiper(".main_swiper_big_box", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 12000,
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
            disableOnInteraction: false
        }
    });

    //네비게이션
    var nav_dep = ".dep-1";
    var nav_sub_gnb = ".dep-2";

    // 호버
    $(nav_dep).hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });

    $(nav_sub_gnb).hover(function (){
        $(this).parents(nav_dep).addClass("hover");
    })
});

//aos 리턴
$(window).on('load', function () {
    AOS.refresh();
});




