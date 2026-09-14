import p5 from 'p5';

const CONFIG = {
    particleCount: 75,
    connectionDistance: 150,
    mouseRadius: 180,

    colors: {
        purple: [139, 77, 255] as [number, number, number],
        lightPurple: [171, 120, 255] as [number, number, number],
        white: [235, 235, 245] as [number, number, number]
    }
};

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    noiseOffset: number;

    constructor(private p: p5) {
        this.x = p.random(p.width);
        this.y = p.random(p.height);

        this.vx = p.random(-0.25, 0.25);
        this.vy = p.random(-0.25, 0.25);

        this.size = p.random(1, 3);
        this.alpha = p.random(35, 120);
        this.noiseOffset = p.random(1000);
    }

    update() {
        const p = this.p;

        this.vx += p.map(p.noise(this.noiseOffset), 0, 1, -0.002, 0.002);
        this.vy += p.map(p.noise(this.noiseOffset + 500), 0, 1, -0.002, 0.002);
        this.noiseOffset += 0.003;

        this.x += this.vx;
        this.y += this.vy;

        const d = p.dist(p.mouseX, p.mouseY, this.x, this.y);

        if (d < CONFIG.mouseRadius) {
            const angle = p.atan2(this.y - p.mouseY, this.x - p.mouseX);
            const force = p.map(d, 0, CONFIG.mouseRadius, 0.04, 0);

            this.vx += p.cos(angle) * force;
            this.vy += p.sin(angle) * force;
        }

        if (this.x < -20) this.x = p.width + 20;
        if (this.x > p.width + 20) this.x = -20;

        if (this.y < -20) this.y = p.height + 20;
        if (this.y > p.height + 20) this.y = -20;

        this.vx = p.constrain(this.vx, -0.45, 0.45);
        this.vy = p.constrain(this.vy, -0.45, 0.45);
    }

    display() {
        const p = this.p;

        p.noStroke();

        p.fill(
            CONFIG.colors.purple[0],
            CONFIG.colors.purple[1],
            CONFIG.colors.purple[2],
            this.alpha * 0.12
        );
        p.circle(this.x, this.y, this.size * 7);

        p.fill(
            CONFIG.colors.lightPurple[0],
            CONFIG.colors.lightPurple[1],
            CONFIG.colors.lightPurple[2],
            this.alpha
        );
        p.circle(this.x, this.y, this.size);
    }
}

class Pulse {
    a!: Particle;
    b!: Particle;
    progress!: number;
    speed!: number;

    constructor(private p: p5, private particles: Particle[]) {
        this.reset();
    }

    reset() {
        const p = this.p;

        this.a = p.random(this.particles);
        this.b = p.random(this.particles);

        while (
            this.a === this.b ||
            p.dist(this.a.x, this.a.y, this.b.x, this.b.y) > CONFIG.connectionDistance
        ) {
            this.a = p.random(this.particles);
            this.b = p.random(this.particles);
        }

        this.progress = p.random();
        this.speed = p.random(0.004, 0.009);
    }

    update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
            this.reset();
        }
    }

    display() {
        const p = this.p;

        const x = p.lerp(this.a.x, this.b.x, this.progress);
        const y = p.lerp(this.a.y, this.b.y, this.progress);

        p.noStroke();

        p.fill(139, 77, 255, 25);
        p.circle(x, y, 12);

        p.fill(190, 145, 255, 180);
        p.circle(x, y, 2.5);
    }
}

new p5((sketch: p5) => {
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];

    sketch.setup = () => {
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.parent('hero-background');

        sketch.pixelDensity(1);

        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle(sketch));
        }

        for (let i = 0; i < 8; i++) {
            pulses.push(new Pulse(sketch, particles));
        }
    };

    sketch.draw = () => {
        sketch.clear();

        drawGrid();
        drawAmbientGlow();
        drawConnections();

        for (const particle of particles) {
            particle.update();
            particle.display();
        }

        for (const pulse of pulses) {
            pulse.update();
            pulse.display();
        }

        drawScanline();
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };

    function drawGrid() {
        const spacing = 70;

        sketch.stroke(139, 77, 255, 7);
        sketch.strokeWeight(1);

        for (let x = 0; x < sketch.width; x += spacing) {
            sketch.line(x, 0, x, sketch.height);
        }

        for (let y = 0; y < sketch.height; y += spacing) {
            sketch.line(0, y, sketch.width, y);
        }

        sketch.noStroke();

        for (let x = 0; x < sketch.width; x += spacing) {
            for (let y = 0; y < sketch.height; y += spacing) {
                sketch.fill(139, 77, 255, 10);
                sketch.circle(x, y, 2);
            }
        }
    }

    function drawAmbientGlow() {
        sketch.noStroke();

        for (let r = 500; r > 20; r -= 10) {
            const alpha = sketch.map(r, 500, 20, 0, 5);

            sketch.fill(
                CONFIG.colors.purple[0],
                CONFIG.colors.purple[1],
                CONFIG.colors.purple[2],
                alpha
            );

            sketch.circle(sketch.width * 0.78, sketch.height * 0.48, r);
        }

        for (let r = 350; r > 20; r -= 10) {
            const alpha = sketch.map(r, 350, 20, 0, 3);

            sketch.fill(139, 77, 255, alpha);
            sketch.circle(sketch.width * 0.52, sketch.height * 0.55, r);
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];

                const distance = sketch.dist(a.x, a.y, b.x, b.y);

                if (distance < CONFIG.connectionDistance) {
                    let alpha = sketch.map(distance, 0, CONFIG.connectionDistance, 35, 0);

                    const mouseDistance = sketch.dist(
                        sketch.mouseX,
                        sketch.mouseY,
                        (a.x + b.x) / 2,
                        (a.y + b.y) / 2
                    );

                    if (mouseDistance < CONFIG.mouseRadius) {
                        alpha += sketch.map(mouseDistance, 0, CONFIG.mouseRadius, 25, 0);
                    }

                    sketch.stroke(
                        CONFIG.colors.purple[0],
                        CONFIG.colors.purple[1],
                        CONFIG.colors.purple[2],
                        alpha
                    );

                    sketch.strokeWeight(0.7);
                    sketch.line(a.x, a.y, b.x, b.y);
                }
            }
        }
    }

    function drawScanline() {
        const scanSpeed = 0.035;

        const y = (sketch.millis() * scanSpeed) % (sketch.height + 150) - 75;

        sketch.stroke(139, 77, 255, 8);
        sketch.strokeWeight(1);
        sketch.line(0, y, sketch.width, y);
    }
});