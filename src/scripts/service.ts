const popup = document.getElementById("popup");
const phoneImage = document.getElementById("phone_image") as HTMLImageElement;

const cards: Record<string, string> = {
    card_porfolio: "porfolio-online.png",
    card_linktree: "linktree.png",
    card_curriculum: "curriculo-digital.png",
    card_landing: "landing-page.png",
    card_sells: "pagina-de-vendas.png",
    card_birthday: "pagina-de-aniversario.png",
    card_institucional: "site-institucional.png",
    card_events: "pagina-de-evento.png",
};

Object.entries(cards).forEach(([id, image]) => {
    document.getElementById(id)?.addEventListener("click", () => {
        phoneImage.src = `./src/assets/images/services/${image}`;
        popup?.classList.add("open");
    });
});

popup?.addEventListener("click", () => {
    popup.classList.remove("open");
});
