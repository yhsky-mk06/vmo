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

    //aos js
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
    var nav_dep = ".dep-1";

    // 호버
    $(nav_dep).hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
});

//aos 리턴
$(window).on('load', function () {
    AOS.refresh();
});




// 서브 왼쪽 메뉴 스크롤 이벤트
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $(".header_nav").outerHeight();

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
        // Scroll Down
        if (!$(".header_nav").hasClass("fixed")) {
            $(".header_nav").addClass("up");
        }
    }

    lastScrollTop = st;
}


$(function() {
    $(".sub_left_menu").hide();
    $(".sub_left_menu").addClass("fixed");


    $(".sub_left_menu .sub_left_menu_list a").click(function(event) {
        event.preventDefault();
        //console.log(".sub_left_menu .sub_left_menu_list a");
        var anchor = $(this).attr("href");
        var anchor_target = $('.' + anchor);
        if (anchor_target.length > 0) {
            var offset = anchor_target.offset();
            $('html, body').animate({
                scrollTop: offset.top - 100
            }, 200);
        }
    });

    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var heightOffset = windowHeight / 2; // 현재 윈도우 높이의 반 값

        if (scrollTop + windowHeight >= documentHeight - heightOffset) {
            $(".sub_left_menu").fadeOut();
        } else {
            if (scrollTop > 50) {
                $(".sub_left_menu").fadeIn();
            } else {
                $(".sub_left_menu").fadeOut();
            }
        }
    });

    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();
        var heightOffset = windowHeight / 2; // 현재 윈도우 높이의 반 값

        $(".content section").each(function() {
            var sectionTop = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();

            if (scrollPosition >= sectionTop - heightOffset && scrollPosition < sectionTop + sectionHeight - heightOffset) {
                var currentVisibleId = $(this).attr("class");
                console.log("현재 보여지는 영역의 class:", currentVisibleId);
                // currentVisibleId의 값을 href 속성값으로 갖고 있는 요소에 클래스 추가
                $(".sub_left_menu_list li").removeClass("on");
                $(".sub_left_menu_list a[href='" + currentVisibleId + "']").parent().addClass("on");

                return false; // 현재 보여지는 영역을 찾았으므로 반복문 종료
            }
        });
    });
});


//서브 영업소소개 js
const mainTabItem = document.querySelectorAll('.tab_item')
const mainTabInner = document.querySelectorAll('.tab_inner')

function updateTabPosition() {
    const centerPos1 = document.querySelector('.tab_item.on').offsetLeft
    document.documentElement.style.setProperty('--tabLeftPos', centerPos1 + 'px')
}

mainTabItem.forEach((tab, idx)=> {
    tab.addEventListener('click', function(){
        mainTabInner.forEach((inner)=> {
            inner.classList.remove('on')
        })

        mainTabItem.forEach((item)=> {
            item.classList.remove('on')
        })

        mainTabItem[idx].classList.add('on')
        mainTabInner[idx].classList.add('on')

        updateTabPosition()
    })
})

window.addEventListener('resize', function () {
    updateTabPosition();
    mainVisualLayer();
})

function initMap() {
    const ls = { lat: 37.750253, lng: 127.228944 };
    const map = new google.maps.Map(document.getElementById("map_wrap"), {
        center: ls,
        zoom: 15,
    });

    const contentString =
        '<div class="price-tag">' +
        '일신비츠온' +
        '</div>';

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "일신비츠온",
    });

    const marker = new google.maps.Marker({
        position: ls,
        map,
        title: "일신비츠온",
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}

window.initMap = initMap;