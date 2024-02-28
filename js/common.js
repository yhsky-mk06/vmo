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
    var delta = 5;
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

        if (Math.abs(lastScrollTop - st) <= delta) return;


        if (st > lastScrollTop && st > navbarHeight) {
            console.log(st > lastScrollTop && st > navbarHeight)
            // Scroll Down
            if (!$(".header").hasClass("transparent")) {
                $(".header").addClass("up");
                $(".header").removeClass("header_bg");
                $(".header .header_quick").removeClass("on");
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

    //햄버거 메뉴
    $("header .header_quick").click(function (event) {
        event.preventDefault();
        $(this).toggleClass("on");
        $(".header").toggleClass("active");
        $(".header").removeClass("transparent");
    });


    $(".sub_gnb_box a").click(function(event) {

        event.preventDefault();
        var anchor = $(this).attr("href");
        var anchor_target = $('.' + anchor);
        if (anchor_target.length > 0) {
            var offset = anchor_target.offset();
            $('html, body').animate({
                scrollTop: offset.top - 100
            }, 400);
        }

        let pathname = $(location).attr('pathname');
        pathname = pathname.replace(anchor);
        history.pushState(null, null, anchor);

        console.log('anchor_match_nav', anchor);
    });


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


$(document).ready(function(){
    document.addEventListener("DOMContentLoaded", function () {
        console.log("DOMContentLoaded");
        // 운영자산 앵커 클릭 시 스크롤 이동
        var linkElements = document.querySelectorAll(".sub_left_menu .sub_left_menu_list a");
        linkElements.forEach(function (linkElement) {
            linkElement.addEventListener("click", function (event) {
                event.preventDefault();
                var target = document.querySelector("#" + linkElement.getAttribute("href"));
                var targetTop = target.offsetTop;
                window.scrollTo({
                    top: targetTop - 75,
                    behavior: "smooth",
                });
            });
        });
    });
});


var isEmpty = function (value) {
    if (value == "false" || value == 0 || value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

