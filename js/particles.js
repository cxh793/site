// 粒子背景动画
function particlesJS() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('particles-js').appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 粒子配置
    const particlesConfig = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#64FFDA'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64FFDA',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        }
    };

    // 创建粒子
    const particles = [];
    for (let i = 0; i < particlesConfig.particles.number.value; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * particlesConfig.particles.size.value,
            speedX: (Math.random() - 0.5) * particlesConfig.particles.move.speed,
            speedY: (Math.random() - 0.5) * particlesConfig.particles.move.speed,
            color: particlesConfig.particles.color.value,
            opacity: Math.random() * particlesConfig.particles.opacity.value
        });
    }

    // 绘制粒子
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
            ctx.fill();
        }
        
        connectParticles();
    }

    // 连接粒子
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distance = Math.sqrt(
                    Math.pow(particles[a].x - particles[b].x, 2) + 
                    Math.pow(particles[a].y - particles[b].y, 2)
                );
                
                if (distance < particlesConfig.particles.line_linked.distance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${hexToRgb(particlesConfig.particles.line_linked.color)}, ${particlesConfig.particles.line_linked.opacity})`;
                    ctx.lineWidth = particlesConfig.particles.line_linked.width;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // 更新粒子位置
    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
        }
    }

    // 动画循环
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    // 工具函数：十六进制转RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
    }

    // 窗口大小改变时重新调整画布大小
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // 开始动画
    animate();
}

// 页面加载完成后初始化粒子动画
window.addEventListener('DOMContentLoaded', particlesJS);