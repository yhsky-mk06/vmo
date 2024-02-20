//서브 영업소 소개
$(function() {
    const tabItem = document.querySelectorAll('.office_tab')
    const tabInner = document.querySelectorAll('.office_info')

    function updateTabPosition() {
        const centerPos = document.querySelector('.office_tab.on').offsetLeft
        document.documentElement.style.setProperty('--tabLeftPos', centerPos + 'px')

        const centerWidth = document.querySelector('.office_tab.on').offsetWidth
        document.documentElement.style.setProperty('--tabWidht', centerWidth + 'px')
    }

    tabItem.forEach((tab, idx)=> {
        tab.addEventListener('click', function(){
            tabInner.forEach((inner)=> {
                inner.classList.remove('on')
            })

            tabItem.forEach((item)=> {
                item.classList.remove('on')
            })

            tabItem[idx].classList.add('on')
            tabInner[idx].classList.add('on')

            updateTabPosition()
        })
    })

    window.addEventListener('load', function () {
        updateTabPosition();
    })

    window.addEventListener('resize', function () {
        updateTabPosition();
    })
});


//연혁
$(function() {
    var items = $(".history_box li"),
        timelineHeight = $(".history_box ul").height(),
        greyLine = $('.default-line'),
        lineToDraw = $('.draw-line');

    if(lineToDraw.length) {
        $(window).on('scroll', function () {

            var redLineHeight = lineToDraw.height(),
                greyLineHeight = greyLine.height(),
                windowDistance = $(window).scrollTop(),
                windowHeight = $(window).height() / 2,
                timelineDistance = $(".history_box").offset().top;

            if(windowDistance >= timelineDistance - windowHeight) {
                line = windowDistance - timelineDistance + windowHeight;

                if(line <= greyLineHeight) {
                    lineToDraw.css({
                        'height' : line + 20 + 'px'
                    });
                }
            }

            var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true);
            items.each(function(index){
                var circlePosition = $(this).offset();

                if(bottom > circlePosition.top) {
                    $(this).addClass('in-view');
                } else {
                    $(this).removeClass('in-view');
                }
            });
        });
    }
});


//지도
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