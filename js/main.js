// 主脚本文件

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 初始化打字机效果
    if (document.querySelector('.typed-text')) {
        new Typed(document.querySelector('.typed-text'), {
            strings: [
                '我热爱AI编程',
                '专注于数据分析',
                '擅长Web开发',
                '追求技术创新'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 1000,
            loop: true
        });
    }
    
    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        }
    });
});