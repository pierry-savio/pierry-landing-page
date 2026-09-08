const arrow_left = document.getElementById("arrow_left");
const arrow_right = document.getElementById("arrow_right");
const p_cards = document.getElementsByClassName("p-card");
const dots = document.getElementsByClassName("dot");
const dots_container = document.getElementById("dots_container");

let current_index = 0;

createDots();

function createDots(){

    for (let i = 0; i < p_cards.length; i++){
        const dot = document.createElement('div');
        dot.classList.add("dot");
        if (i == current_index){
            dot.classList.add("active");
        }
        dots_container?.appendChild(dot);
    }
}

function updateDots() {
    if (current_index > 0){
        dots[current_index-1].classList.remove("active");
    }

    if (current_index < p_cards.length-1){
        dots[current_index+1].classList.remove("active");
    }
    dots[current_index].classList.add("active");
}

arrow_right?.addEventListener("click", () => {
    if (current_index < p_cards.length - 1) {

        let current_card = p_cards[current_index];
        let left_card = p_cards[current_index - 1];
        let right_card = p_cards[current_index + 1];
        let new_card = p_cards[current_index + 2];

        if (new_card) {
            new_card.classList.remove("hid-right");
            new_card.classList.add("right");
        }

        if (current_card) {
            current_card.classList.add("left");
        }

        if (left_card) {
            left_card.classList.add("hid-left");
        }

        if (right_card) {
            right_card.classList.remove("right", "hid-right");
        }

        current_index++;
        updateDots();
    }

});

arrow_left?.addEventListener("click", () => {

    if (current_index > 0) {
        let current_card = p_cards[current_index];
        let left_card = p_cards[current_index - 1];
        let right_card = p_cards[current_index + 1];
        let new_card = p_cards[current_index - 2];

        if (new_card) {
            new_card.classList.remove("hid-left");
            new_card.classList.add("left");
        }

        if (current_card) {
            current_card.classList.add("right");
        }

        if (left_card) {
            left_card.classList.remove("left", "hid-left");
        }

        if (right_card) {
            right_card.classList.add("hid-right");
        }

        current_index--;
        updateDots();
    }
});


