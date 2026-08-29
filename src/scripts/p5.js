let particles = [];
let pulses = [];

const CONFIG = {
    particleCount: 75,
    connectionDistance: 150,
    mouseRadius: 180,

    colors: {
        purple: [139, 77, 255],
        lightPurple: [171, 120, 255],
        white: [235, 235, 245]
    }
};

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);

    canvas.parent("hero-background");

    pixelDensity(1);

    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }

    // Pequenos pulsos que percorrem as conexões
    for (let i = 0; i < 8; i++) {
        pulses.push(new Pulse());
    }
}

function draw() {
    clear();

    // Fundo extremamente sutil
    drawGrid();

    // Glow atmosférico
    drawAmbientGlow();

    // Conexões
    drawConnections();

    // Partículas
    for (const particle of particles) {
        particle.update();
        particle.display();
    }

    // Pulsos tecnológicos
    for (const pulse of pulses) {
        pulse.update();
        pulse.display();
    }

    // Scanline muito discreta
    drawScanline();
}


/* =========================
   GRID
========================= */

function drawGrid() {
    const spacing = 70;

    stroke(139, 77, 255, 7);
    strokeWeight(1);

    for (let x = 0; x < width; x += spacing) {
        line(x, 0, x, height);
    }

    for (let y = 0; y < height; y += spacing) {
        line(0, y, width, y);
    }

    // Pequenos pontos nas intersecções
    noStroke();

    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            fill(139, 77, 255, 10);
            circle(x, y, 2);
        }
    }
}


/* =========================
   GLOW
========================= */

function drawAmbientGlow() {
    noStroke();

    // Glow principal no lado direito
    for (let r = 500; r > 20; r -= 10) {
        const alpha = map(r, 500, 20, 0, 5);

        fill(
            CONFIG.colors.purple[0],
            CONFIG.colors.purple[1],
            CONFIG.colors.purple[2],
            alpha
        );

        circle(
            width * 0.78,
            height * 0.48,
            r
        );
    }

    // Glow secundário no centro
    for (let r = 350; r > 20; r -= 10) {
        const alpha = map(r, 350, 20, 0, 3);

        fill(139, 77, 255, alpha);

        circle(
            width * 0.52,
            height * 0.55,
            r
        );
    }
}


/* =========================
   CONNECTIONS
========================= */

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            const a = particles[i];
            const b = particles[j];

            const distance = dist(
                a.x,
                a.y,
                b.x,
                b.y
            );

            if (distance < CONFIG.connectionDistance) {

                let alpha = map(
                    distance,
                    0,
                    CONFIG.connectionDistance,
                    35,
                    0
                );

                // Conexões próximas ao mouse ficam mais fortes
                const mouseDistance = dist(
                    mouseX,
                    mouseY,
                    (a.x + b.x) / 2,
                    (a.y + b.y) / 2
                );

                if (mouseDistance < CONFIG.mouseRadius) {
                    alpha += map(
                        mouseDistance,
                        0,
                        CONFIG.mouseRadius,
                        25,
                        0
                    );
                }

                stroke(
                    CONFIG.colors.purple[0],
                    CONFIG.colors.purple[1],
                    CONFIG.colors.purple[2],
                    alpha
                );

                strokeWeight(0.7);

                line(
                    a.x,
                    a.y,
                    b.x,
                    b.y
                );
            }
        }
    }
}


/* =========================
   PARTICLE
========================= */

class Particle {

    constructor() {
        this.x = random(width);
        this.y = random(height);

        this.vx = random(-0.25, 0.25);
        this.vy = random(-0.25, 0.25);

        this.size = random(1, 3);

        this.alpha = random(35, 120);

        this.noiseOffset = random(1000);
    }

    update() {

        // Movimento orgânico
        this.vx += map(
            noise(this.noiseOffset),
            0,
            1,
            -0.002,
            0.002
        );

        this.vy += map(
            noise(this.noiseOffset + 500),
            0,
            1,
            -0.002,
            0.002
        );

        this.noiseOffset += 0.003;

        this.x += this.vx;
        this.y += this.vy;

        // Interação suave com mouse
        const d = dist(
            mouseX,
            mouseY,
            this.x,
            this.y
        );

        if (d < CONFIG.mouseRadius) {

            const angle = atan2(
                this.y - mouseY,
                this.x - mouseX
            );

            const force = map(
                d,
                0,
                CONFIG.mouseRadius,
                0.04,
                0
            );

            this.vx += cos(angle) * force;
            this.vy += sin(angle) * force;
        }

        // Limites
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;

        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Limita velocidade
        this.vx = constrain(this.vx, -0.45, 0.45);
        this.vy = constrain(this.vy, -0.45, 0.45);
    }

    display() {

        noStroke();

        // Glow
        fill(
            CONFIG.colors.purple[0],
            CONFIG.colors.purple[1],
            CONFIG.colors.purple[2],
            this.alpha * 0.12
        );

        circle(
            this.x,
            this.y,
            this.size * 7
        );

        // Núcleo
        fill(
            CONFIG.colors.lightPurple[0],
            CONFIG.colors.lightPurple[1],
            CONFIG.colors.lightPurple[2],
            this.alpha
        );

        circle(
            this.x,
            this.y,
            this.size
        );
    }
}


/* =========================
   PULSES
========================= */

class Pulse {

    constructor() {
        this.reset();
    }

    reset() {

        this.a = random(particles);
        this.b = random(particles);

        while (
            this.a === this.b ||
            dist(
                this.a.x,
                this.a.y,
                this.b.x,
                this.b.y
            ) > CONFIG.connectionDistance
        ) {
            this.a = random(particles);
            this.b = random(particles);
        }

        this.progress = random();

        this.speed = random(
            0.004,
            0.009
        );
    }

    update() {

        this.progress += this.speed;

        if (this.progress >= 1) {
            this.reset();
        }
    }

    display() {

        const x = lerp(
            this.a.x,
            this.b.x,
            this.progress
        );

        const y = lerp(
            this.a.y,
            this.b.y,
            this.progress
        );

        noStroke();

        // Halo
        fill(139, 77, 255, 25);

        circle(
            x,
            y,
            12
        );

        // Ponto luminoso
        fill(190, 145, 255, 180);

        circle(
            x,
            y,
            2.5
        );
    }
}


/* =========================
   SCANLINE
========================= */

function drawScanline() {

    const scanSpeed = 0.035;

    const y =
        (millis() * scanSpeed) %
        (height + 150) - 75;

    stroke(139, 77, 255, 8);
    strokeWeight(1);

    line(
        0,
        y,
        width,
        y
    );
}


/* =========================
   RESIZE
========================= */

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );
}