var isEmpty = function (value) {
    if (value == "false" || value == 0 || value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

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
            if (scrollTop > 200) {
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

$(window).on('load', function () {
    $(".header").addClass("header_bg");
});

