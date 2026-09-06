const arrow_right = document.getElementById("arrow_right");
const cardsArray = document.querySelectorAll(".p-card");

let idx = 0;

function centralize(p_card: Element): void {
    p_card.classList.remove("right", "hid-right", "left", "hid-left");
}

arrow_right?.addEventListener("click", () => {
    centralize(cardsArray[0]);
    console.log(cardsArray[0]);
});