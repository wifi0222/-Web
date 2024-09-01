document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});
// 初始化Swiper
var swiper = new Swiper('.swiper-container', {
    loop: true, // 启用循环播放
    autoplay: {
        delay: 3000, // 设置自动播放的间隔时间，单位为毫秒
        disableOnInteraction: false, // 用户交互后是否继续自动播放
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // 允许点击分页器
    },
});

