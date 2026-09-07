const arrowRight = document.getElementById("arrow_right") as HTMLElement | null;
const arrowLeft = document.getElementById("arrow_left") as HTMLElement | null;
const cards = document.querySelectorAll<HTMLElement>(".p-card");
const dots = document.querySelectorAll<HTMLElement>(".point");

let currentIndex = 0;

/**
 * Updates all card positions and dot indicators based on the current index.
 */
function updateCarousel(): void {
    cards.forEach((card, i) => {
        // Remove all position classes
        card.classList.remove("left", "hid-left", "right", "hid-right");

        if (i < currentIndex) {
            // Cards before the active one → hidden to the left
            card.classList.add("hid-left");
        } else if (i > currentIndex) {
            // Cards after the active one → hidden to the right
            card.classList.add("hid-right");
        }
        // i === currentIndex → no class, card is centered (default state)
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

// Arrow right → next card
arrowRight?.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Arrow left → previous card
arrowLeft?.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Dot click → go to specific card
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
    });
});

// Initialize on load
updateCarousel();