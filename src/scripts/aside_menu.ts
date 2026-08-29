const menu_icon = document.getElementById("menu_icon") as HTMLElement;
const ul_mobile = document.getElementById("ul_mobile") as HTMLElement;
const main = document.getElementsByTagName("main")[0];

menu_icon.addEventListener("click", () => {
    menu_icon.classList.toggle("opened");
    ul_mobile.classList.toggle("closed");
});

main.addEventListener("click", () => {
    menu_icon.classList.add("opened");
    ul_mobile.classList.add("closed");
});