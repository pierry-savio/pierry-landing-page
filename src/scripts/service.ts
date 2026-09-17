//Popup
const popup = document.getElementById("popup");

//Images
const inst_img = document.getElementById("inst_img") as HTMLImageElement;
const portfolio_img = document.getElementById("portfolio_img") as HTMLImageElement;
const linktree_img = document.getElementById("linktree_img") as HTMLImageElement;
const curriculum_img = document.getElementById("curriculum_img") as HTMLImageElement;
const landing_img = document.getElementById("landing_img") as HTMLImageElement;
const sells_img = document.getElementById("sells_img") as HTMLImageElement;
const birth_img = document.getElementById("aniver_img") as HTMLImageElement;
const event_img = document.getElementById("event_img") as HTMLImageElement;

//Images container
const phone = document.getElementById("phone") as HTMLImageElement;

//Buttons
const card_institucional = document.getElementById("card_institucional") as HTMLImageElement;
const card_portfolio = document.getElementById("card_portfolio") as HTMLImageElement;
const card_linktree = document.getElementById("card_linktree") as HTMLImageElement;
const card_curriculum = document.getElementById("card_curriculum") as HTMLImageElement;
const card_landing = document.getElementById("card_landing") as HTMLImageElement;
const card_sells = document.getElementById("card_sells") as HTMLImageElement;
const card_birthday = document.getElementById("card_birthday") as HTMLImageElement;
const card_events = document.getElementById("card_events") as HTMLImageElement;



function openPopup(img_index: number): void{
    popup?.classList.add("opened");
    let images: HTMLCollection = phone.children;
    console.log(images);
    for (let i = 0; i<images.length; i++){
        images[i].classList.remove("opened");
    }
    images[img_index].classList.add("opened");
  
}

function closePopup(){
    popup?.classList.remove("opened");
}

//Event listenners
//Closing
popup?.addEventListener("click", () =>{
    closePopup();
});

card_institucional.addEventListener("click", () =>{
    openPopup(0);
});
card_portfolio.addEventListener("click", () =>{
    openPopup(1);
});
card_linktree.addEventListener("click", () =>{
    openPopup(2);
});
card_curriculum.addEventListener("click", () =>{
    openPopup(3);
});
card_landing.addEventListener("click", () =>{
    openPopup(4);
});
card_sells.addEventListener("click", () =>{
    openPopup(5);
});
card_birthday.addEventListener("click", () =>{
    openPopup(6);
});
card_events.addEventListener("click", () =>{
    openPopup(7);
});