document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    let particles = [];

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const getThemeColors = () => {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        return {
            particleColor: isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            lineColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        };
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 1 - 0.5;
            this.vy = Math.random() * 1 - 0.5;
            this.radius = Math.random() * 1.5 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw(colors) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.particleColor;
            ctx.fill();
        }
    }

    const createParticles = () => {
        particles = [];
        const particleCount = (canvas.width * canvas.height) / 10000;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };

    const connectParticles = (colors) => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = colors.lineColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        const colors = getThemeColors();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw(colors);
        });

        connectParticles(colors);
        requestAnimationFrame(animate);
    };

    // Initial setup
    setCanvasSize();
    createParticles();
    animate();

    // Re-setup on window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        createParticles();
    });

    // Watch for theme changes to update colors
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // We need a slight delay for the body class to update before we redraw
            setTimeout(() => {
                // No need to call animate() again, the loop is already running
            }, 100);
        });
    }
});