$(function () {

    // 메인 헤더 스크롤
    // $(window).on("load", loadHandler);
    $(window).on("scroll", scrollHandler);

    // function loadHandler() {
    //     let to = $(window).scrollTop();
    //     fixed(to);
    //     right_top_button(to);
    // }

    function scrollHandler() {
        let to = $(window).scrollTop();
        fixed(to);
        right_top_button(to);
    }

    function fixed(to) {
        (to > 50) ? $("#header").addClass("fixed") : $("#header").removeClass("fixed"),
            (to > 50) ? $("#wrap").addClass("move") : $("#wrap").removeClass("move");
        return;
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



    AOS.init({
        duration: 1200
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
            delay: 13000,
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
    // 변수
    var nav_dep = ".dep-1";

    // 호버
    $(nav_dep).hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
});

$(window).on('load', function () {
    AOS.refresh();
});

$(".scroll_wrap").hide();
$(".scroll_wrap").addClass("fixed");

// 앵커 링크
var pathname = jQuery(location).attr('pathname');
var anchor_match = pathname.match(/\/company\/([^/]*)/);
// console.log('anchor_match', anchor_match[1]);

if (!isEmpty(anchor_match[1])) {
    anchor = anchor_match[1]; // 값이 있으면 배열로 리턴되므로 두번째값에 적용
    var anchor_target = $('.' + anchor);
    if (anchor_target.length > 0) {
        var offset = anchor_target.offset();
        $('html, body').animate({
            scrollTop: offset.top - 100
        }, 400);
    }

}

$(".scroll_wrap .target_list a").click(function(event) {
    event.preventDefault();
    console.log(".scroll_wrap .target_list a");
    var anchor = $(this).attr("href");
    var anchor_target = $('.' + anchor);
    if (anchor_target.length > 0) {
        var offset = anchor_target.offset();
        $('html, body').animate({
            scrollTop: offset.top - 100
        }, 400);
    }
});