window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const particleSize = 2;
    const particleSpacing = 4;
    const mouseRadius = 50;
    const mouse = { x: null, y: null, radius: mouseRadius };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = particleSize;
            this.color = '#EB0029';
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 30) + 1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = (forceDirectionX * force * this.density);
            let directionY = (forceDirectionY * force * this.density);

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
        }
    }

    function getParticlePositionsFromText(text) {
        const positions = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 텍스트 글꼴 및 크기 설정
        ctx.font = '150px Arial Black'; // 원하는 글꼴로 변경 가능
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const textData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (let y = 0; y < canvas.height; y += particleSpacing) {
            for (let x = 0; x < canvas.width; x += particleSpacing) {
                const index = (y * canvas.width + x) * 4;
                if (textData[index + 3] > 128) { 
                    positions.push({ x, y });
                }
            }
        }
        return positions;
    }

    function init(text) {
        particlesArray = [];
        const positions = getParticlePositionsFromText(text);
        positions.forEach(pos => {
            particlesArray.push(new Particle(pos.x, pos.y));
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.draw();
            particle.update();
        });
        requestAnimationFrame(animate);
    }

    document.getElementById('textInput').addEventListener('input', function(event) {
        const text = event.target.value;
        init(text);
    });

    init("INPUT");
    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(document.getElementById('textInput').value || "INPUT");
    });
};
