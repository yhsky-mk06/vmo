//서브 고객센터 탭
$(function() {
    const tabItem = document.querySelectorAll('.service_tab')
    const tabInner = document.querySelectorAll('.service_info')

    function updateTabPosition() {
        const centerPos = document.querySelector('.service_tab.on').offsetLeft
        document.documentElement.style.setProperty('--tabLeftPos', centerPos + 'px')

        const centerWidth = document.querySelector('.service_tab.on').offsetWidth
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