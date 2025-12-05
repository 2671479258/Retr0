document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Header 滚动效果
    const header = document.querySelector('.header');
    ScrollTrigger.create({
        start: "top -100px", // 滚动100px后触发
        end: 99999,
        toggleClass: "scrolled",
        // pin: true, // 可选：滚动时固定头部
        // pinSpacing: false // 如果pin:true，通常需要设置false
    });

    // 导航栏切换 (移动端)
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuLinks = document.querySelectorAll('.main-nav a');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
        gsap.to(mainNav, {
            x: mainNav.classList.contains('active') ? '0%' : '100%',
            duration: 0.4,
            ease: 'power3.out'
        });
    });

    // 导航链接点击后关闭移动端菜单并平滑滚动
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    if (mainNav.classList.contains('active')) {
                        gsap.to(mainNav, {
                            x: '100%',
                            duration: 0.4,
                            ease: 'power3.in',
                            onComplete: () => {
                                mainNav.classList.remove('active');
                                navToggle.querySelector('i').classList.remove('fa-times');
                                navToggle.querySelector('i').classList.add('fa-bars');
                            }
                        });
                    }
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: targetElement,
                            offsetY: window.innerHeight * 0.1 // 避免被固定头部遮挡
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });

    // 女神异闻录式菜单选中指示器
    const menuSelector = document.querySelector('.menu-selector');
    const menuItems = document.querySelectorAll('.main-nav .menu-list li');

    function updateMenuSelector(element) {
        if (!element || window.innerWidth <= 1024) { // 移动端不显示
            gsap.to(menuSelector, { width: 0, duration: 0.3 });
            return;
        }
        const rect = element.getBoundingClientRect();
        const navRect = mainNav.getBoundingClientRect();
        gsap.to(menuSelector, {
            width: rect.width * 0.8, // 略短一点的宽度
            x: rect.left - navRect.left + (rect.width * 0.1), // 居中
            duration: 0.4,
            ease: 'elastic.out(1, 0.7)' // 弹跳效果
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => updateMenuSelector(e.target.parentElement));
        link.addEventListener('mouseleave', () => {
            // 鼠标离开时保持在当前激活项上，或者隐藏
            // 这里我们选择隐藏，更符合P系列的瞬时感
            if (window.innerWidth > 1024) {
                 gsap.to(menuSelector, { width: 0, duration: 0.3 });
            }
        });
    });

    // 页面加载动画 - 英雄区
    gsap.from('.profile-hero-block', { opacity: 0, x: -100, rotate: -15, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.profile-hero-pic', { scale: 0.8, duration: 1.5, ease: 'back.out(1.7)', delay: 0.7 });
    gsap.from('.brush-stroke.stroke-1', { opacity: 0, scale: 0.5, rotate: -30, duration: 1, ease: 'power2.out', delay: 1 }); // 笔触动画
    gsap.from('.hero-text-block', { opacity: 0, x: 100, duration: 1.5, ease: 'power3.out', delay: 0.8 });
    gsap.from('.intro-name', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 1 });
    gsap.from('.intro-tagline', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 1.2 });
    gsap.from('.hero-actions .hero-btn', { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)', delay: 1.5 });
    gsap.from('.scroll-down-indicator', { opacity: 0, y: 20, duration: 1, ease: 'power2.out', delay: 2 });
    // 报纸碎片初始动画
    gsap.from('.newspaper-fragment', { opacity: 0, scale: 0.8, stagger: 0.3, duration: 1.5, ease: 'power3.out', delay: 0.2 });
    gsap.from('.scribble-arrow', { opacity: 0, x: -50, rotate: -30, duration: 1, ease: 'power2.out', delay: 1.8 });


    // 滚动触发动画 - Section Title
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // 滚动触发动画 - About Section
    gsap.from('.about-text-area', {
        opacity: 0,
        x: -80,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
        }
    });
    gsap.from('.about-visual-area', {
        opacity: 0,
        x: 80,
        rotate: 15,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
        }
    });
    gsap.from('.brush-stroke.stroke-2', { opacity: 0, scale: 0.5, rotate: 20, duration: 1, ease: 'power2.out', delay: 0.5,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
        }
    });

    // 滚动触发动画 - Skill Cards (P系列特色不规则动画)
    gsap.utils.toArray('.skill-card-p').forEach((card, i) => {
        const rotateDeg = (i % 2 === 0 ? -3 : 3) + Math.random() * 2 - 1; // 随机小倾斜
        gsap.set(card, { '--rotate-deg': `${rotateDeg}deg`, '--rotate-deg-hover': `${rotateDeg * -0.5}deg` }); // 设置CSS变量

        gsap.from(card, {
            opacity: 0,
            y: 100,
            x: i % 2 === 0 ? -50 : 50, // 左右错位入场
            rotation: rotateDeg * 2, // 初始倾斜更大
            scale: 0.8,
            duration: 1.4,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // 滚动触发动画 - Works Grid (更像P系列的卡片切割/滑入效果)
    gsap.utils.toArray('.work-item-p').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 80,
            rotateZ: Math.random() * 10 - 5, // 随机Z轴旋转
            scale: 0.8,
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.15, // 略微延迟，形成波浪式入场
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
            }
        });
    });

    // 滚动触发动画 - Contact Channels
    gsap.utils.toArray('.social-icon-p, .contact-info-card').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            rotate: i % 2 === 0 ? 5 : -5,
            duration: 1,
            ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
            }
        });
    });

    // 视差滚动动画 (背景移动)
    gsap.to(".parallax-dark-1", {
        backgroundPositionY: "top",
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-dark-1",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    gsap.to(".parallax-dark-2", {
        backgroundPositionY: "bottom",
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-dark-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });

    // 视差文本入场动画 (P系列手写/涂鸦感)
    gsap.utils.toArray('.parallax-text-overlay p').forEach(text => {
        gsap.from(text, {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotation: Math.random() * 10 - 5, // 随机倾斜
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        });
    });

    // 作品分类过滤功能 (P系列式的切换动画)
    const categoryBtns = document.querySelectorAll('.category-btn');
    const workItems = document.querySelectorAll('.work-item-p');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active状态
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // P系列切割/淡出动画
            gsap.to(workItems, {
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotationX: 30, // 增加切割感
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    workItems.forEach(item => {
                        const isVisible = filter === 'all' || item.dataset.category === filter;
                        item.style.display = isVisible ? 'block' : 'none'; // 先隐藏不符合条件的
                    });
                    // 淡入动画
                    gsap.fromTo(workItems, {
                        opacity: 0,
                        scale: 0.8,
                        y: 50,
                        rotationX: -30,
                    }, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotationX: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'back.out(1.2)',
                        // 确保只有可见元素才动画
                        onStart: function() {
                            this.targets().forEach(target => {
                                if (target.style.display !== 'none') {
                                    gsap.set(target, { display: 'block' });
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    // 初始加载时应用一次过滤器（显示所有）
    categoryBtns[0].click();
});