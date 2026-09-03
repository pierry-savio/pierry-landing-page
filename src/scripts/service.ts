
const card_porfolio = document.getElementById("card_porfolio");
const card_linktree = document.getElementById("card_linktree");
const card_curriculum = document.getElementById("card_curriculum");
const card_landing = document.getElementById("card_landing");
const card_sells = document.getElementById("card_sells");
const card_birthday = document.getElementById("card_birthday");
const card_institucional = document.getElementById("card_institucional");
const card_events = document.getElementById("card_events");

const phone_image = document.getElementById("phone_image") as HTMLImageElement;

const popup = document.getElementById("popup");

card_porfolio?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/porfolio-online.png";
});
card_linktree?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/linktree.png";
});
card_curriculum?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/curriculo-digital.png";
});
card_landing?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/landing-page.png";
});
card_sells?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/pagina-de-vendas.png";
});
card_birthday?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/pagina-de-aniversario.png";
});
card_institucional?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/site-institucional.png";
});
card_events?.addEventListener("click", () =>{
    popup?.classList.remove("closed");
    phone_image.src = "./src/assets/images/services/pagina-de-evento.png";
});

popup?.addEventListener("click", () =>{
    popup?.classList.add("closed");
});
