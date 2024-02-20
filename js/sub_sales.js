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

$(function() {
    var accordion = function(el, active) {
        this.el = el || {};
        active = active || 0;
        var that = this;
        var links = this.el.find('.sales_accordion_tit');
        links.each(function(i){
            var link = links.eq(i);
            if (link.next().length === 0) { link.find('.icon_arrow').hide(); }
            link.on('click', { link: link }, that.dropdown);
        });
        if (active > 0) {
            links.eq(active - 1).trigger('click');
        }
    }

    accordion.prototype.dropdown = function(e) {
        e.preventDefault();
        var $this = e.data.link;
        $this.parent()
            .siblings('.open').find('.sales_accordion_info').slideUp()
            .addBack().removeClass('open');
        $this.parent()
            .toggleClass('open')
            .find('.sales_accordion_info').stop().slideToggle();
    };

    var accordion_wrap = new accordion($('.sales_accordion_wrap'), 1);
});